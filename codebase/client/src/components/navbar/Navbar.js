import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  accountCircle: {
    paddingRight: "5px",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      console.log("User logged out");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Quiz App
        </Typography>
        <Button color="inherit" component={Link} to={"/add-quiz"}>
          Add Quiz</Button>
        <Button color="inherit" component={Link} to={"/login"}>
          Login
        </Button>
        <Button color="inherit" component={Link} to={"/signup"}>
          Sign Up
        </Button>
        <div>
          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle className={classes.accountCircle} />
                <Typography>Hammad</Typography>
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
                <MenuItem>My Profile</MenuItem>
                <MenuItem>My Quizzes</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
