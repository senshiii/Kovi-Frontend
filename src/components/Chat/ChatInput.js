import { Box, Button, IconButton, TextField, Tooltip } from "@material-ui/core";
import { MicNone, SendSharp } from "@material-ui/icons";
import { useState, useContext, useCallback } from "react";
import { ChatContext } from "../../context/ChatContext";
import VoiceInputModal from "./VoiceInputModal";

const ChatInput = (props) => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(ChatContext);
  const [voiceInput, setVoiceInput] = useState(false);

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
      <VoiceInputModal
        open={voiceInput}
        onClose={() => setVoiceInput(false)}
        onFinish={sendMessage}
      />
      <Tooltip title="Click for Voice Input" placement="right">
        <IconButton
          color="primary"
          style={{ marginRight: "5px" }}
          onClick={() => setVoiceInput(true)}
        >
          <MicNone />
        </IconButton>
      </Tooltip>
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
