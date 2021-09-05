import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
  retry: { backgroundColor: "#24A0ED", color: "white", marginTop: "20px" },
}));

const Result = ({ score }) => {
  const classes = useStyles();
  return (
    <div>
      <div>My Result: {score}</div>
      <div>
        <Button
          className={classes.retry}
          component={Link}
          to={"/quiz"}
          variant="contained"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};
export default Result;
