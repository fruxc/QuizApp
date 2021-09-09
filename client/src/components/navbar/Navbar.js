import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
    paddingTop: theme.spacing(1),
  },
  accountCircle: {
    paddingRight: "5px",
  },
  leaderboard: {
    margin: theme.spacing(3, 0, 2),
  },
  toolbar: {
    padding: "5px",
  },
}));

const Navbar = ({ user, authState }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      authState();
      window.location.href = "/";
      toast("User has been logged out successfully!");
    } catch (err) {
      toast(err.message);
    }
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Grid
          justifyContent="space-between" // Add it here :)
          container
          spacing={1}
        >
          <Grid item>
            <Typography
              className={classes.title}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Quiz App
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history.replace("/score");
              }}
            >
              Leaderboard
            </Button>
            {!user && (
              <Fragment>
                <Button color="inherit" component={Link} to={"/login"}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to={"/signup"}>
                  Sign Up
                </Button>
              </Fragment>
            )}
            {user && (
              <Fragment>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle className={classes.accountCircle} />
                  <Typography>{user.name}</Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <Link
                    to={{
                      pathname: "/profile",
                      state: {
                        users: user,
                      },
                    }}
                  >
                    <MenuItem>My Profile</MenuItem>
                  </Link>
                  <Link
                    to={{
                      pathname: "/scores",
                      state: {
                        users: user,
                      },
                    }}
                  >
                    <MenuItem>My Quizzes</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Fragment>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
