import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StopSharp, VolumeUpSharp } from "@material-ui/icons";
import { Fragment, useCallback, useState } from "react";

const speechSynthesis = window.speechSynthesis;

const useStyles = makeStyles({
  suggestionChip: {
    margin: "3px 0",
    padding: "4px 5px",
    marginRight: "8px",
    display: "inline-flex",
    fontWeight: "bold",
  },
  suggContainer: {
    width: "100%",
  },
  ChatMessage: {
    width: "60%",
    maxWidth: "60%",
    margin: "5px 0 1rem 0",
    cursor: "pointer",
    background: "rgb(179, 218, 233)",
    paddingTop: "1rem",
    paddingBottom: 0,
  },
});

const ChatMessage = ({ isUser, username, msg, isReadable, onClick }) => {
  const classes = useStyles();

  const [speechInProgress, setSpeechInProgress] = useState(false);

  const stopTalking = () => {
    speechSynthesis.cancel();
    setSpeechInProgress(false);
  };

  const talk = useCallback(() => {
    try {
      const speechUtter = new SpeechSynthesisUtterance(msg?.text);
      speechUtter.onend = () => setSpeechInProgress(false);
      speechSynthesis.speak(speechUtter);
      setSpeechInProgress(true);
    } catch (err) {}
  }, [msg?.text]);

  return (
    <Fragment>
      <Card
        style={{ marginLeft: isUser ? "40%" : 0 }}
        color="primary"
        className={classes.ChatMessage}
        onClick={onClick}
      >
        <CardHeader
          title={username}
          subheader={new Date(msg?.createdAt).toDateString()}
          avatar={
            <Avatar style={{ background: "orange" }}>
              {username?.charAt(0)?.toUpperCase()}
            </Avatar>
          }
          style={{ padding: "7px 10px" }}
          action={
            <Tooltip
              title={speechInProgress ? "Stop Reading" : "Read Message"}
              placement="right"
            >
              {speechInProgress ? (
                <IconButton
                  style={{ display: isReadable ? "block" : "none" }}
                  color="primary"
                  onClick={stopTalking}
                >
                  <StopSharp style={{ color: "red" }} />
                </IconButton>
              ) : (
                <IconButton
                  style={{ display: isReadable ? "block" : "none" }}
                  color="primary"
                  onClick={talk}
                >
                  <VolumeUpSharp />
                </IconButton>
              )}
            </Tooltip>
          }
        />
        <CardContent>
          <Typography variant="body2">{msg?.text}</Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ChatMessage;
