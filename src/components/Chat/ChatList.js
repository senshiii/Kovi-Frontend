import { Fragment, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { InfoContext } from "../../context/InfoContext";
import ChatMessage from "./ChatMessage";
import ChatQuery from "./ChatQuery";

const ChatList = () => {
  const { fetchSuccess: loaded, messages } = useContext(ChatContext);
  const { loadData } = useContext(InfoContext);
  return (
    <Fragment>
      <ChatMessage
        username="Kovi"
        msg={{ text: "Hello from Kovi", createdAt: new Date() }}
      />
      {loaded &&
        messages.map((msg, index, array) => (
          <ChatQuery
            key={msg.id}
            msg={msg}
            onClick={() => loadData(msg)}
            showSuggestions={index === array.length - 1}
          />
        ))}
    </Fragment>
  );
};

export default ChatList;
