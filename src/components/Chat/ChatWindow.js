import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ChatContext } from "../../context/ChatContext";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

const useStyles = makeStyles({
  ChatMessageList: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
    background: "#fff",
    padding: "0.5rem",
    marginBottom: ".75rem",
  },
  ChatWindow: {
    width: "100%",
    height: "92%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
});

const ChatWindow = (props) => {
  const classes = useStyles();

  const { loading, messages } = useContext(ChatContext);
  const [cref, setCref] = useState(null);

  const chatRef = x => {
    if(x) setCref(x);
  }

  useEffect(() => {
    if(cref){
      // console.log("Scrolling");
      // console.log(cref.scrollHeight);
      // console.log(cref.scrollTop);
      cref.scrollTop = cref.scrollHeight;
    }
  }, [messages, cref]);

  const LoadingView = (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <CircularProgress />
      <br />
      <Typography variant="body2" color="textPrimary">
        Loading Messages...
      </Typography>
    </Box>
  );

  return (
    <Box className={classes.ChatWindow}>
      <Box className={classes.ChatMessageList} ref={chatRef}>
        {loading ? LoadingView : <ChatList />}
      </Box>
      <ChatInput sendMessage={props.sendMessage} loading={props.loading} />
    </Box>
  );
};

export default ChatWindow;
