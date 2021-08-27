import {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
} from "react";
import Pusher from "pusher-js";
import axiosInstance from "../axios";
import { SessionContext } from "./SessionContext";
import { InfoContext } from "./InfoContext";

export const ChatContext = createContext({
  messages: [],
  sendMessage: () => {},
  loadMessages: () => {},
  fetchSuccess: false,
  loading: false,
});

const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [pusherSet, setPusherSet] = useState(false);
  const { sessionId, inSession } = useContext(SessionContext);
  const [pusherChannel, setPusherChannel] = useState(null);
  const { setShow, loadData } = useContext(InfoContext);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        "/session/thread?sessionId=" + sessionId
      );
      const msgs = res.data.messages;
      setLoading(false);
      setMessages(msgs);
      setFetchSuccess(true);
    } catch (err) {
      console.log("Error While fetching Messages ", err);
    }
  }, [sessionId]);

  const sendMessage = useCallback(
    async (message) => {
      try {
        const res = await axiosInstance.post("/query?sessionId=" + sessionId, {
          message,
        });
        const data = res.data;
        console.log("New Message Res = ", data);
        setMessages([...messages, data]);
      } catch (err) {
        console.log("Error while Sending Message", err);
      }
    },
    [sessionId, messages]
  );

  // USE EFFECT TO INITIALIZE PUSHER CLIENT WHEN SESSION IS AVAILABLE
  useEffect(() => {
    if (inSession && !pusherSet) {
      let pusher = new Pusher("d928bbd35de9450c199a", {
        cluster: "ap2",
      });
      const channel = pusher.subscribe("INTENT_DATA_CHANNEL");
      setPusherChannel(channel);
      setPusherSet(true);
    }
  }, [inSession, pusherSet, messages]);

  // USE EFFECT TO LOAD MESSAGES WHEN SESSION IS AVAILABLE
  useEffect(() => {
    if (inSession) {
      loadMessages();
    }
  }, [inSession, loadMessages]);

  // LOG CHANGES IN MESSAGES
  // REBIND THE PUSHER CHANNEL TO EVENT ON CHANGE IN MESSAGES
  useEffect(() => {
    if (pusherChannel && pusherChannel.bind) {

      // Unbind Channel from Event
      pusherChannel.unbind("ON_DATA");

      // Bind Channel to Event
      pusherChannel.bind("ON_DATA", (pusherData) => {
        console.log("[Pusher Callback] Pusher Data: ", pusherData);

        // Updating Message
        const updatedMsgList = messages.map((msg) =>
          msg.id === pusherData.id ? pusherData : msg
        );

        // Setting Message as the recent Info Context Message
        loadData(pusherData);

        // Updating the Message List
        setMessages(updatedMsgList);
      });
    }
  }, [messages, pusherChannel, loadData, setShow]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        fetchSuccess,
        sendMessage,
        loadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
