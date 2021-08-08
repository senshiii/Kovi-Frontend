import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

const ChatWindow = (props) => {
  const chatListRef = useRef();
  const { loading, messages } = useContext(ChatContext);

  useEffect(() => {
    if (chatListRef.current)
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [chatListRef]);

  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages]);

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
    <Box className="Chat-Window">
      <Box className="Chat-Message-List" ref={chatListRef}>
        {loading ? LoadingView : <ChatList />}
      </Box>
      <ChatInput sendMessage={props.sendMessage} loading={props.loading} />
    </Box>
  );
};

export default ChatWindow;
