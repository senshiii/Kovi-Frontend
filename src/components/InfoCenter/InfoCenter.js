import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SentimentDissatisfiedSharp } from "@material-ui/icons";
import { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { InfoContext } from "../../context/InfoContext";
import NewsList from "./News/NewsList";
import InfoCenterMessage from "./InfoCenterMessage";
import InfoCenterHeader from "./InfoCenterHeader";

const useStyles = makeStyles((theme) => ({
  infoCenter: {
    width: "30%",
    height: "90%",
    marginLeft: "2.5%",
    background: "#ccc",
    borderRadius: "4px",
    overflow: "hidden",
    overflowY: "auto",
  },
  newsListContainer: {
    height: "auto",
    width: "100%",
    background: "#fff",
    padding: "10px",
  },
  sectionHead: {
    padding: "10px",
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
    borderRadius: 4,
  },
  noRes: {
    height: "72%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#fff",
    padding: "0 2rem",
    textAlign: "center",
  },
}));

const InfoCenter = () => {
  const { icMsg, show } = useContext(InfoContext);
  const classes = useStyles();
  return (
    <CSSTransition
      unmountOnExit
      onEnter={(data) => console.log("On Enter", data)}
      onEntering={(data) => console.log("On Entering", data)}
      onEntered={(data) => console.log("On Entered", data)}
      in={show}
      classNames="ic"
      timeout={500}
    >
      <Box className={classes.infoCenter} boxShadow={2}>
        {/* Info Center header. TODO Decide whether to keep global headers or individual headers */}
        <InfoCenterHeader />
        {/* Info Center Message */}
        <InfoCenterMessage />
        {/* Info Center Resources */}
        {icMsg?.response?.hasResources ? (
          <Box className={classes.newsListContainer}>
            <NewsList />
          </Box>
        ) : (
          <Box component="div" className={classes.noRes}>
            <SentimentDissatisfiedSharp fontSize="large" />
            <Typography
              variant="body1"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              This Message does not have any additional Resources
            </Typography>
          </Box>
        )}
      </Box>
    </CSSTransition>
  );
};

export default InfoCenter;
