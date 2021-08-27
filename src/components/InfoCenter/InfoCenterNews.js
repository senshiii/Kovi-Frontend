import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import NewsCard from "./News/NewsCard";

const useStyles = makeStyles((theme) => ({
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
}));

const InfoCenterNews = ({ hasNews, news }) => {
  const classes = useStyles();
  if (!hasNews) return null;

  return (
    <Box className={classes.newsListContainer}>
      {news?.map((n, index) => (
        <NewsCard news={n} key={index} />
      ))}
    </Box>
  );
};

export default InfoCenterNews;
