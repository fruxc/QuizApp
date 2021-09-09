import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Leaderboard from "../leaderboard/Leaderboard";
import { submitAttempt } from "../../services/QuizService";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 4),
  },
  leaderboard: {
    padding: "20px",
    justifyContent: "space-around",
  },
  result: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    margin: "auto",
    justifyContent: "center",
    alignItem: "center",
  },
  card: {
    height: "400px",
    width: "100%",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "5px",
    textAlign: "center",
  },
  title: {
    padding: theme.spacing(2),
  },
  featureList: {
    padding: theme.spacing(2),
  },
  media: {
    height: 90,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
  grid: {
    height: "100%",
    paddingTop: 5,
    textAlign: "center",
    alignItems: "stretch",
    gridRow: "auto / span 2",
  },
  cardActions: {
    textAlign: "center",
    justifyContent: "center",
  },
  retry: { backgroundColor: "#24A0ED", color: "white", marginTop: "20px" },
}));

const Result = ({ score, name, quizName, quizData, user, result }) => {
  const classes = useStyles();
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);
  React.useEffect(() => {
    const submitResult = async () => {
      const data = result;
      try {
        const response = await submitAttempt(data);
        if (response.success) {
          toast("Response has been submitted");
        }
      } catch (err) {
        toast(err.message);
      }
    };
    submitResult();
    setTimeout(() => {
      setShowLeaderboard(true);
    }, 4000);
  }, []);
  return (
    <div className={classes.result}>
      <Container component="section" maxWidth="lg" className={classes.root}>
        {showLeaderboard ? (
          <Leaderboard quizId={quizData._id} className={classes.leaderboard} />
        ) : null}
        <br />
        <br />
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={4} className={classes.grid}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  className={classes.title}
                >
                  Name: {name}
                </Typography>
                <Typography className={classes.featureList}>
                  Quiz: {quizName}
                </Typography>
                <Typography className={classes.featureList}>
                  My Score: {score}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Link
                  to={{
                    pathname: "/quiz",
                    state: { quizData: quizData, user: user },
                  }}
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }}
                >
                  <Button className={classes.retry} variant="contained">
                    Retry
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Result;
