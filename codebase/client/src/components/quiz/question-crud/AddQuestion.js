import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { addquestion } from "../../../services/QuizService";

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

export default function AddQuestion() {
  const classes = useStyles();

  const question = React.useRef(null);
  const option1 = React.useRef(null);
  const option2 = React.useRef(null);
  const option3 = React.useRef(null);
  const option4 = React.useRef(null);
  const correct_answer = React.useRef(null);
  

  const handleNext = async (e) => {
    e.preventDefault();
    const data = {
      question: question.current.value,
      answers: [option1.current.value,option2.current.value,option3.current.value,option4.current.value],
      answer: correct_answer.current.value,
    };
    let response;
    try {
      response = await addquestion(data);
      console.log(response);
      if (response.success) {
        window.location.href = "/add-question";
      }
    } catch (err) {
      console.log("Show error/ error handling");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      question: question.current.value,
      answers: [option1.current.value,option2.current.value,option3.current.value,option4.current.value],
      answer: correct_answer.current.value,
    };
    let response;
    try {
      response = await addquestion(data);
      console.log(response);
      if (response.success ) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log("Show error/ error handling");
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
        <form key={"add-question"} className={classes.form} onSubmit={handleSubmit}>
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
            inputRef={question}
          />
          <TextField
            inputRef={option1}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="option1"
            label="Option 1"
            id="option1"
            autoComplete="option 1"
          />
          <TextField
            inputRef={option2}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="option2"
            label="Option 2"
            id="option2"
            autoComplete="option 2"
          />
          <TextField
            inputRef={option3}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="option1"
            label="Option 3"
            id="option3"
            autoComplete="option 3"
          />
          <TextField
            inputRef={option4}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="option4"
            label="Option 4"
            id="option4"
            autoComplete="option 4"
          />
          <TextField
            inputRef={correct_answer}
            variant="outlined"
            margin="normal"
            fullWidth
            name="correct_answer"
            label="Correct Answer"
            id="correct_answer"
            autoComplete="Correct Answer"
          />
         

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick= {handleNext}
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
        </form>
      </div>
    </Container>
  );
}
