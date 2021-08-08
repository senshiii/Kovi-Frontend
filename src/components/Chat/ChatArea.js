import ChatWindow from "./ChatWindow";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MoreVertSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  expandBtn: {
    marginLeft: "auto",
    color: "#fff",
  },
}));

const ChatArea = (props) => {
  const classes = useStyles();

  return (
    <Box component="div" boxShadow={2} className="Chat-Area">
      <AppBar className="Chat-Navbar">
        <Toolbar style={{ width: "100%", height: "100%", minHeight: "auto" }}>
          <Typography variant="h5">Kovi Chat</Typography>
          <IconButton className={classes.expandBtn}>
            <MoreVertSharp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ChatWindow
        messages={props.messages}
        loading={props.loading}
        loaded={props.loaded}
      />
    </Box>
  );
};

export default ChatArea;
