import ChatMessage from "./ChatMessage";
import { Alert } from "@material-ui/lab";
import { Box, Chip } from "@material-ui/core";
import { useCallback, useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import { ChatContext } from "../../context/ChatContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  suggestions: {
    maxWidth: "100%",
    // display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: ".5rem 0",
    "& > *": {
      margin: "0 .5rem",
    },
  },
  ChatQuery: {
    padding: "5px",
    borderRadius: 4,
  },
  selected: {
    background: "rgb(255, 234, 217)",
  },
});

const ChatQuery = ({ msg, showSuggestions }) => {
  const classes = useStyles();
  const { icMsg, loadData } = useContext(InfoContext);
  const { sendMessage } = useContext(ChatContext);

  const setInfoData = useCallback(() => {
    loadData(msg);
  }, [msg, loadData]);

  let AlertView = null;

  if (msg?.response?.fetchingResources) {
    AlertView = <Alert severity="info">Loading Additional Resources ...</Alert>;
  } else if (msg?.response?.hasResources) {
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
  }

  return (
    <Box
      className={[
        classes.ChatQuery,
        msg?.id === icMsg?.id ? classes.selected : "",
      ].join(" ")}
    >
      <ChatMessage username="You" isUser msg={msg} onClick={setInfoData} />
      <ChatMessage
        username="Kovi"
        msg={msg?.response}
        onClick={setInfoData}
        isReadable
      />
      {AlertView}
      {msg?.response?.suggestions?.length > 0 && showSuggestions && (
        <Box className={classes.suggestions}>
          <p style={{ display: "inline-flex" }}>Suggestions: </p>
          {msg?.response?.suggestions?.map((suggestion) => (
            <Chip
              onClick={() => sendMessage(suggestion)}
              label={suggestion}
              color="primary"
              variant="outlined"
              style={{ display: "inline-flex", margin: "3px 5px" }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ChatQuery;
