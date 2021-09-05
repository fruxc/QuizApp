import React, { useState, useEffect } from "react";
import Result from "./Result";
import { getQuestions } from "../../services/QuizService";
import {
  CssBaseline,
  makeStyles,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 4),
  },
  window: {
    textAlign: "center",
    fontSize: `clamp(20px, 2.5vw, 24px)`,
    marginTop: "5vh",
  },
  question: {
    width: "70%",
    margin: "0 auto",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    margin: "2em auto",
  },
  option: {
    display: "block",
    border: "1px solid #616a94",
    borderRadius: "15px",
    padding: "15px 30px",
    textDecoration: "none",
    color: "white",
    backgroundColor: "#24A0ED",
    transition: "0.3s",
    fontSize: "1em",
    outline: "none",
    userSelect: "none",
    marginTop: "1em",
    cursor: "pointer",
  },
  timer: {
    fontSize: "3em",
  },
}));

const Quiz = () => {
  const classes = useStyles();
  const [quiz, setQuiz] = useState([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(1);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setNumber(5);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    if (number === 5) {
      clearInterval(myInterval);
    }
    return () => {
      clearInterval(myInterval);
    };
  });

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const pickAnswer = (e) => {
    e.preventDefault();
    e.persist();

    let userAnswer = e.target.outerText;

    if (quiz[number].answer === userAnswer) {
      setScore(score + 1);
      e.target.style.backgroundColor = "green";
    } else {
      e.target.style.backgroundColor = "red";
    }
    setTimeout(() => {
      e.target.style.backgroundColor = "#24A0ED";
      setNumber(number + 1);
    }, 1000);
  };

  useEffect(() => {
    const getQuestionsFromAPI = async () => {
      await getQuestions()
        .then((response) => {
          setQuiz(
            response.results.map((item) => ({
              question: item.question,
              options: shuffle([
                ...item.incorrect_answers,
                item.correct_answer,
              ]),
              answer: item.correct_answer,
            }))
          );
        })
        .catch((err) => console.error(err));
    };
    getQuestionsFromAPI();
  }, []);

  return (
    <Container component="main" className={classes.window}>
      <CssBaseline />
      <Typography className={classes.timer}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
      {quiz[number] && (
        <Grid>
          <Typography
            className={classes.question}
            dangerouslySetInnerHTML={{ __html: quiz[number].question }}
          />
          <div className={classes.options}>
            {quiz[number].options.map((item, index) => (
              <Typography
                className={classes.option}
                key={index}
                dangerouslySetInnerHTML={{ __html: item }}
                onClick={pickAnswer}
              />
            ))}
          </div>
        </Grid>
      )}
      {(number === 5 || (minutes === 0 && seconds === 0)) && (
        <Result score={score} />
      )}
    </Container>
  );
};

export default Quiz;
