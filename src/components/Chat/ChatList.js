import { Fragment, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatQuery from "./ChatQuery";

const ChatList = () => {
  const { fetchSuccess: loaded, messages } = useContext(ChatContext);
  return (
    <Fragment>
      <ChatMessage
        username="Kovi"
        msg={{ text: "Hello from Kovi", createdAt: new Date() }}
      />
      {loaded && messages.map((msg) => <ChatQuery  key={msg.id} msg={msg} />)}
    </Fragment>
  );
};

export default ChatList;
