import { Box, Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { InfoContext } from '../../context/InfoContext'

const useStyles = makeStyles((theme) => ({
  message: {
    height: "20%",
    background: "rgb(175, 202, 226)",
    padding: ".5rem 1rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardPadding: {
    padding: ".5rem .75rem !important",
  },
  cardContent: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const InfoCenterMessage = () => {
  const { icMsg } = useContext(InfoContext)
  const classes = useStyles();
  return (
    <Box className={classes.message}>
      <Card style={{ width: "100%" }}>
        <CardHeader subheader="Your Message" className={classes.cardPadding} />
        <CardContent
          className={[classes.cardPadding, classes.cardContent].join(" ")}
        >
          <Typography variant="caption" title="Message Text">
            {icMsg?.text}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InfoCenterMessage;
