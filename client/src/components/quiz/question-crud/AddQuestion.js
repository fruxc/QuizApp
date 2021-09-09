import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { addQuestion, updateQuestion } from "../../../services/QuizService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddQuestion(props) {
  const classes = useStyles();
  const history = useHistory();
  let questionData = {
    question: "",
    answers: [],
    answer: "",
  };
  let quizId = "";
  if (props.location.state !== undefined) {
    questionData = props.location.state.questionData;
    quizId = props.location.state.quizId;
  }
  const [question, setQuestion] = React.useState(questionData.question);
  const [option1, setOption1] = React.useState(questionData.answers[0] || "");
  const [option2, setOption2] = React.useState(questionData.answers[1] || "");
  const [option3, setOption3] = React.useState(questionData.answers[2] || "");
  const [correct_answer, setCorrectAnswer] = React.useState(
    questionData.answer
  );

  const addQuestionToQuiz = async () => {
    let options = [];
    if (option1 !== "") options.push(option1);
    if (option2 !== "") options.push(option2);
    if (option3 !== "") options.push(option3);
    if (correct_answer !== "") options.push(correct_answer);
    const data = {
      question: question,
      answers: options,
      answer: correct_answer,
    };
    let response;
    try {
      if (questionData._id) {
        response = await updateQuestion(data, quizId, questionData._id);
        if (response.success) {
          toast("Question has been updated successfully!");
        }
      } else {
        response = await addQuestion(data);
        if (response.success) {
          toast("Question added successfully!");
          return response.success;
        } else {
          return response.success;
        }
      }
    } catch (err) {
      toast(err.message);
    }
  };
  const handleNext = async (e) => {
    e.preventDefault();
    if (addQuestionToQuiz()) {
      setTimeout(() => {
        history.replace("/add-question");
        window.location.reload();
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addQuestionToQuiz()) {
      setTimeout(() => {
        localStorage.removeItem("quiz_id");
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Question
        </Typography>
        <form
          key={"add-question"}
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="question"
            label="Question"
            name="question"
            autoComplete="question"
            autoFocus
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="option1"
            label="Option 1"
            id="option1"
            autoComplete="option 1"
            value={option1}
            onChange={(e) => {
              setOption1(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="option2"
            label="Option 2"
            id="option2"
            autoComplete="option 2"
            value={option2}
            onChange={(e) => {
              setOption2(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="option1"
            label="Option 3"
            id="option3"
            autoComplete="option 3"
            value={option3}
            onChange={(e) => {
              setOption3(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="correct_answer"
            label="Correct Answer"
            id="correct_answer"
            autoComplete="Correct Answer"
            value={correct_answer}
            onChange={(e) => {
              setCorrectAnswer(e.target.value);
            }}
          />

          {questionData._id ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Question
            </Button>
          ) : (
            <div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleNext}
              >
                Next
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                End
              </Button>
            </div>
          )}
        </form>
      </div>
    </Container>
  );
}
