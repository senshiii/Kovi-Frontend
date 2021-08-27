import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SentimentDissatisfiedSharp } from "@material-ui/icons";
import InfoCenterNews from "./InfoCenterNews";
import InfoCenterStats from "./InfoCenterStats";

const useStyles = makeStyles({
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
  resWrapper: {
    height: "72%",
  },
});

const InfoCenterResources = ({
  hasResources,
  hasNews,
  news,
  hasStats,
  stats,
}) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  return hasResources ? (
    <Box className={classes.resWrapper}>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={tabIndex}
        onChange={(_, index) => setTabIndex(index)}
        variant="fullWidth"
      >
        <Tab label="News" />
        <Tab label="Stats" />
      </Tabs>
      {tabIndex === 0 && <InfoCenterNews hasNews={hasNews} news={news} />}
      {tabIndex === 1 && <InfoCenterStats hasStats={hasStats} stats={stats} />}
    </Box>
  ) : (
    <Box component="div" className={classes.noRes}>
      <SentimentDissatisfiedSharp fontSize="large" />
      <Typography variant="h6" color="primary" style={{ marginTop: "10px" }}>
        No Additional Resources Found !
      </Typography>
    </Box>
  );
};

export default InfoCenterResources;
