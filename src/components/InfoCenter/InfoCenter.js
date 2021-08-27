import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { InfoContext } from "../../context/InfoContext";
import InfoCenterMessage from "./InfoCenterMessage";
import InfoCenterHeader from "./InfoCenterHeader";
import InfoCenterResources from "./InfoCenterResources";

const useStyles = makeStyles({
  infoCenter: {
    width: "30%",
    height: "90%",
    marginLeft: "2.5%",
    background: "#fff",
    borderRadius: "4px",
    overflow: "hidden",
    overflowY: "auto",
  },
});

const InfoCenter = () => {
  const { show, hasStats, stats, hasNews, news, hasResources } = useContext(
    InfoContext
  );
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
        <InfoCenterResources
          hasStats={hasStats}
          stats={stats}
          hasNews={hasNews}
          news={news}
          hasResources={hasResources}
        />
      </Box>
    </CSSTransition>
  );
};

export default InfoCenter;
