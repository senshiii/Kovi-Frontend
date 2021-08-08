import { Box, Button, TextField } from "@material-ui/core";
import { SendSharp } from "@material-ui/icons";
import { useState, useContext, useCallback } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatInput = (props) => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(ChatContext);

  const send = useCallback(() => {
    sendMessage(message);
    setMessage("");
  }, [message, sendMessage]);

  const pressEnterToSend = (event) => {
    if (event.key === "Enter") {
      send();
    }
  };

  return (
    <Box className="Chat-Input">
      <TextField
        type="text"
        variant="standard"
        color="primary"
        placeholder="Enter your query here. Press Enter or Click Send"
        fullWidth
        style={{ marginRight: ".4rem" }}
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={pressEnterToSend}
        disabled={props.loading}
      />
      <Button
        variant="contained"
        size="medium"
        color="primary"
        style={{ marginLeft: ".4rem" }}
        endIcon={<SendSharp />}
        disabled={props.loading}
        onClick={send}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
