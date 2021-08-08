import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  newsCard: {
    margin: ".85rem 0",
    background: "aliceblue",
  },
  media: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    objectPosition: "center",
    aspectRatio: "16 / 9",
  },
}));

const NewsCard = ({ news }) => {
  const classes = useStyles();
  return (
    <Card className={classes.newsCard} elevation={4}>
      <CardHeader
        titleTypographyProps={{
          variant: "body1",
          style: { marginRight: "1rem" },
        }}
        title={news.title}
        subheaderTypographyProps={{
          variant: "body2",
        }}
        subheader={`Published Date: ${new Date(
          news.publishedDate
        ).toLocaleDateString()}`}
      />
      <CardMedia className={classes.media} image={news.media} title="Image" />
      <CardContent>
        <Typography variant="caption" color="textPrimary">
          {news.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="text">
          Share
        </Button>
        <Button href={news.link} target="_blank" size="small" color="primary" variant="text">
          Read Full Article
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
