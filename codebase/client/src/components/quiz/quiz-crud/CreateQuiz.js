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
import { addquiz } from "../../../services/QuizService";

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

export default function CrateQuiz() {
  const classes = useStyles();

  const title = React.useRef(null);
  const description = React.useRef(null);
  const category = React.useRef(null);
  const duration = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      category: category.current.value,
      description: description.current.value,
      duration: duration.current.value,
    };
    
    let response;
    try {
      response = await addquiz(data);
      console.log(response);
      if (response.success) {
        localStorage.setItem("quiz_id", response.message._id);
        window.location.href = "/add-question";
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
          Create Quiz
        </Typography>
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
            inputRef={title}
          />
          <TextField
            inputRef={category}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="category"
            label="Category"
            id="category"
            autoComplete="category"
          />
          <TextField
            inputRef={description}
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="description"
          />
          <TextField
            inputRef={duration}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="duration"
            label="Duration"
            id="duration"
            autoComplete="duration"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Questions
          </Button>
        </form>
      </div>
    </Container>
  );
}
