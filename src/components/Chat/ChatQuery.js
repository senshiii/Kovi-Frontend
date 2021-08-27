import ChatMessage from "./ChatMessage";
import { InfoContext } from "../../context/InfoContext";
import { Alert } from "@material-ui/lab";
import { useCallback, useContext } from "react";

const ChatQuery = ({ msg }) => {
  const { icMsg, setShow, loadData } = useContext(InfoContext);

  const setInfoData = useCallback(() => {
    setShow(true);
    loadData(msg);
  }, [msg, setShow, loadData]);

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
          This Message has additional resources.&nbsp;
          <span
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={setInfoData}
          >
            Check
          </span>
        </Alert>
      )}
    </>
  );
};

export default ChatQuery;
