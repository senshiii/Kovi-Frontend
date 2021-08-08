import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CancelOutlined } from "@material-ui/icons";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";

const useStyles = makeStyles({
  appbar: {
    height: "8%",
  },
  toolbar: {
    minHeight: 0,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    display: "inline-flex",
    color: "#fff",
  },
});

const InfoCenterHeader = () => {
  const classes = useStyles();
  const { reset } = useContext(InfoContext);
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Information Center</Typography>
        <Tooltip title="Hide Information Center" placement="bottom">
          <IconButton className={classes.closeBtn} onClick={reset}>
            <CancelOutlined />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default InfoCenterHeader;
