import ChatMessage from "./ChatMessage";
import { InfoContext } from "../../context/InfoContext";
import { ChatContext } from "../../context/ChatContext";
import { Alert } from "@material-ui/lab";
import { useCallback, useContext } from "react";
import { Box, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  suggestions: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: ".5rem 0",
    "& > *": {
      margin: "0 .5rem",
    },
  },
});

const ChatQuery = ({ msg, showSuggestions }) => {
  const classes = useStyles();
  const { icMsg, setShow, loadData } = useContext(InfoContext);
  const { sendMessage } = useContext(ChatContext);

  const setInfoData = useCallback(() => {
    setShow(true);
    loadData(msg);
  }, [msg, setShow, loadData]);

  let AlertView = null;

  if (msg?.response?.fetchingResources)
    AlertView = <Alert severity="info">Loading Additional Resources ...</Alert>;
  else if (msg?.response?.hasResources)
    AlertView = (
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
    );

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
      {AlertView}
      {msg?.response?.suggestions?.length > 0 && showSuggestions && (
        <Box className={classes.suggestions}>
          <p>Suggestions: </p>
          {msg?.response?.suggestions?.map((suggestion) => (
            <Chip
              onClick={() => sendMessage(suggestion)}
              label={suggestion}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default ChatQuery;
