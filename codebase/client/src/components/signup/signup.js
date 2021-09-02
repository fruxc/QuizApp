import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container,
  Input,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SignupService from "../../services/SignupService";
import LoginService from "../../services/LoginService";
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

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const email = React.useRef(null);
  const name = React.useRef(null);
  const phoneNumber = React.useRef(null);
  const password = React.useRef(null);
  const confirmPassword = React.useRef(null);
  const [file, setFile] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      alert("Password does not match!");
      return;
    }

    const data = new FormData();
    data.append("email", email.current.value);
    data.append("password", password.current.value);
    data.append("name", name.current.value);
    data.append("phone", phoneNumber.current.value);

    if (file) {
      data.append("profile_picture", file);
    }
    let response;
    try {
      response = await SignupService(data);
      if (response.success) {
        const loginData = {
          email: email.current.value,
          password: password.current.value,
        };
        console.log(loginData);
        response = await LoginService(loginData);
        if (response.success && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          window.location.href = "/";
        }
      }
      history.push("/");
    } catch (err) {
      console.log("Show error/ error handling");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form key={"haha"} className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            type="text"
            name="name"
            autoComplete="name"
            autoFocus
            inputRef={name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phoneNumber"
            autoFocus
            type="text"
            inputRef={phoneNumber}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            inputRef={email}
          />
          <TextField
            inputRef={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            inputRef={confirmPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
          />
          Profile Picture
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            fullWidth
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Don't have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default SignUp;
