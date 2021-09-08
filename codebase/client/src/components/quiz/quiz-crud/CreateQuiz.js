import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {
  addQuiz,
  updateQuiz,
  deleteQuestion,
} from "../../../services/QuizService";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  questions: {
    justifyContent: "space-between",
  },
}));

export default function CreateQuiz(props) {
  const classes = useStyles();
  let quizData = {
    title: "",
    description: "",
    category: "",
    duration: {
      minutes: "",
      hours: "",
      seconds: "",
    },
  };
  if (props.location.state !== undefined) {
    quizData = props.location.state.quizData;
  }
  const [title, setTitle] = React.useState(quizData.title);
  const [description, setDescription] = React.useState(quizData.description);
  const [category, setCategory] = React.useState(quizData.category);
  const [duration, setDuration] = React.useState(quizData.duration.minutes);

  const addMoreQuestion = async (e) => {
    e.preventDefault();
    try {
      if (quizData._id) {
        localStorage.setItem("quiz_id", quizData._id);
        window.location.href = "/add-question";
      }
    } catch (err) {
      toast(err.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      category: category,
      description: description,
      duration: { minutes: duration },
    };

    let response;
    try {
      if (quizData._id) {
        response = await updateQuiz(data, quizData._id);
        if (response.success) {
          window.location.href = "/";
        }
      } else {
        response = await addQuiz(data);
        if (response.success) {
          localStorage.setItem("quiz_id", response.message._id);
          window.location.href = "/add-question";
        }
      }
    } catch (err) {
      toast(err.message);
    }
  };

  const handleDelete = async (questionId) => {
    let response;
    try {
      response = await deleteQuestion(quizData._id, questionId);
      if (response.success) {
        toast("Question deleted successfully!");
      }
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        {quizData._id === undefined ? (
          <Typography component="h1" variant="h5">
            Create Quiz
          </Typography>
        ) : (
          <Typography component="h1" variant="h5">
            Update Quiz
          </Typography>
        )}
        <form key={"add-quiz"} className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="category"
            label="Category"
            id="category"
            autoComplete="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="duration"
            label="Duration (in Minutes)"
            id="duration"
            value={duration}
            autoComplete="duration"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
          {quizData._id ? (
            <div>
              {quizData._id !== null &&
                quizData.questions.map((question, index) => (
                  <Accordion key={question._id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Question{index + 1}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{question.question}</Typography>
                    </AccordionDetails>
                    <AccordionDetails classes={{ root: classes.questions }}>
                      <Link
                        to={{
                          pathname: "/add-question",
                          state: {
                            questionData: question,
                            quizId: quizData._id,
                          },
                        }}
                      >
                        <Button
                          color="primary"
                          size="large"
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                        onClick={() => {
                          handleDelete(question._id);
                        }}
                      >
                        Delete
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                ))}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Quiz
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                  addMoreQuestion(e);
                }}
              >
                Add More Questions
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Questions
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}
