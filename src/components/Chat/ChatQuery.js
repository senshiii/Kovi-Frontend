import ChatMessage from "./ChatMessage";
import { InfoContext } from "../../context/InfoContext";
import { Alert } from "@material-ui/lab";
import { useCallback, useContext } from "react";

const ChatQuery = ({ msg }) => {
  const { icMsg, setIcMsg, setNews, setShow } = useContext(InfoContext);

  const setInfoData = useCallback(() => {
    setShow(true)
    setIcMsg(msg);
    setNews(msg.response.resources.news?.articles);
  }, [msg, setIcMsg, setNews, setShow]);

  return (
    <>
      <ChatMessage
        username="You"
        isUser
        msg={msg}
        selected={msg.id === icMsg?.id}
        onClick={setInfoData}
      />
      <ChatMessage username="Kovi" msg={msg?.response} onClick={setInfoData} />
      {msg?.response?.fetchingResources && (
        <Alert severity="info">Loading Additional Resources ...</Alert>
      )}
      {msg?.response?.hasResources && (
        <Alert severity="success">
          This Response has additional resources.&nbsp;
          <span
            style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
            onClick={setInfoData}
          >Click to Check</span>
        </Alert>
      )}
    </>
  );
};

export default ChatQuery;
