import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HelpOutlineSharp } from "@material-ui/icons";
import { useContext } from "react";
import { InfoContext } from "../../../context/InfoContext";
import NewsCard from "./NewsCard";

const useStyles = makeStyles((theme) => ({
  feedback: {
    marginTop: 16,
    padding: ".85rem 0",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const NewsList = () => {
  const classes = useStyles();
  const { news } = useContext(InfoContext);
  return (
    <Box component="div" width="100%" height="100%">
      <Typography component="div" variant="h6" className={classes.sectionHead}>
        News Articles
      </Typography>
      {news?.length > 0 && (
        <>
          {news.map((n, index) => (
            <NewsCard news={n} key={index} />
          ))}
          <Box className={[classes.feedback, classes.center].join(" ")}>
            <Button
              variant="text"
              size="small"
              color="primary"
              className={classes.center}
            >
              <HelpOutlineSharp />
              &nbsp;Was this helpful ?
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default NewsList;
