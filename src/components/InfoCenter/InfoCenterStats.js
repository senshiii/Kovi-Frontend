import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pie } from "react-chartjs-2";

const useStyles = makeStyles({
  header: {
    width: "75%",
    margin: "0 auto",
    padding: ".5rem 0",
    borderBottom: "1px solid #000",
    // background: "rgb(187, 234, 255)",
  },
  stats: {
    height: "100%",
    padding: ".5rem",
    paddingBottom: "1.5rem",
  },
  chart: {
    width: "85%",
    margin: "1rem auto",
  },
});

const InfoCenterStats = ({ hasStats, stats }) => {
  const classes = useStyles();

  if (!hasStats) return null;

  console.log(stats);

  return (
    <Box className={classes.stats}>
      {/* <Box className={classes.header}>
        <Typography variant="h6">Six Months Report</Typography>
      </Box> */}
      <Box className={classes.header}>
        <Typography variant="h6">Covid Statistics - World</Typography>
      </Box>
      <Box className={classes.chart}>
        {stats && (
          <Pie
            data={{
              labels: ["Total Cases", "Total Recoered", "Total Deaths"],
              datasets: [
                {
                  label: "World Covid Statistics",
                  data: [
                    stats.totalCases || stats.TotalCases,
                    stats.TotalRecovered || stats.totalRecovered,
                    stats.TotalDeaths || stats.totalDeaths,
                  ],
                  backgroundColor: [
                    "rgb(255, 206, 86)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 99, 132)",
                  ],
                  borderWidth: 0,
                },
              ],
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default InfoCenterStats;
