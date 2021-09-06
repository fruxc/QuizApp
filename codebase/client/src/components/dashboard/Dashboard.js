import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import { getQuizzes } from "../../services/QuizService";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 4),
  },
  quiz: {
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
}));

export default function Dashboard({ user, authenticated }) {
  const classes = useStyles();
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    const response = await getQuizzes();
    setQuizzes(response.message);
  };

  return (
    <div className={classes.quiz}>
      <Container component="section" maxWidth="lg" className={classes.root}>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {quizzes !== null &&
            quizzes.map((quiz) => (
              <Grid item xs={12} sm={4} className={classes.grid} key={quiz._id}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h3"
                      className={classes.title}
                    >
                      {quiz.title}
                    </Typography>
                    <Typography className={classes.featureList}>
                      {quiz.description}
                    </Typography>
                    <Typography className={classes.featureList}>
                      {quiz.category}
                    </Typography>
                  </CardContent>
                  {user && authenticated ? (
                    <CardActions className={classes.cardActions}>
                      <Link
                        to={{
                          pathname: "/quiz",
                          state: { quizData: quiz, user: user },
                        }}
                      >
                        <Button
                          color="primary"
                          size="large"
                          variant="contained"
                        >
                          Attempt Quiz
                        </Button>
                      </Link>
                    </CardActions>
                  ) : (
                    <CardActions className={classes.cardActions}>
                      <Typography className={classes.featureList}>
                        Please login or sign up to attempt quiz
                      </Typography>
                    </CardActions>
                  )}
                  {user && authenticated && user.role === "admin" && (
                    <CardActions className={classes.cardActions}>
                      <Button color="primary" size="large" variant="contained">
                        Edit
                      </Button>
                      <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          {user && authenticated && user.role === "admin" && (
            <Grid item xs={12} sm={4} className={classes.grid}>
              <Button
                color="primary"
                size="large"
                variant="contained"
                component={Link}
                to={"/add-quiz"}
              >
                <AddIcon />
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}
