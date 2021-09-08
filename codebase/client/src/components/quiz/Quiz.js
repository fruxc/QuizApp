import React, { useState, useEffect } from "react";
import Result from "./Result";
import {
  CssBaseline,
  makeStyles,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import { submitAttempt } from "../../services/QuizService";
import { toast } from "react-toastify";

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

const Quiz = (props) => {
  let quizData;
  if (props !== null || props !== undefined) {
    quizData = props.location.state.quizData;
  }
  let user;
  if (props !== null || props !== undefined) {
    user = props.location.state.user;
  }
  const classes = useStyles();
  const [quiz, setQuiz] = useState([]);
  const [number, setNumber] = useState(0);
  const quizLength = quizData.questions.length;
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(quizData.duration.minutes);
  const [seconds, setSeconds] = useState(quizData.duration.seconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setNumber(quizLength);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    if (number === quizLength) {
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
    const quizAttempt = () => {
      setQuiz(
        quizData.questions.map((item) => ({
          question: item.question,
          options: shuffle([...item.answers]),
          answer: item.answer,
        }))
      );
    };
    quizAttempt();
  }, []);

  const submitResult = async () => {
    const data = {
      quizId: quizData._id,
      name: user.name,
      title: quizData.title,
      Score: score,
      userId: user.id,
    };
    try {
      await submitAttempt(data);
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <Container component="main" className={classes.window}>
      <CssBaseline />
      {number === quizLength || (minutes === 0 && seconds === 0) ? null : (
        <Typography className={classes.timer}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
      )}
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
      {(number === quizLength || (minutes === 0 && seconds === 0)) &&
        submitResult() && (
          <Result
            score={score}
            quizName={quizData.title}
            name={user.name}
            quizData={quizData}
            user={user}
          />
        )}
    </Container>
  );
};

export default Quiz;
