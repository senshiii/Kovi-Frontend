import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
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
    margin: "1rem 0",
    cursor: "pointer"
  },
  selected: {
    background: theme.palette.info.dark
  }
}));

const ChatMessage = ({ isUser, username, msg, selected, onClick }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Card
        style={{ marginLeft: isUser ? "40%" : 0 }}
        color="primary"
        className={[classes.ChatMessage, selected ? classes.selected : ""].join(
          " "
        )}
        onClick={onClick}
      >
        <CardHeader
          title={username}
          subheader={new Date(msg?.createdAt).toDateString()}
          avatar={<Avatar >{username?.charAt(0)?.toUpperCase()}</Avatar>}
          style={{ padding: "7px 10px" }}
        />
        <CardContent>
          <Typography variant="body2">{msg?.text}</Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ChatMessage;
