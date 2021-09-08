import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
} from "@material-ui/core";
import {
  getLeaderboardByQuiz,
  getLeaderboard,
  getLeaderboardByUser,
} from "../../services/QuizService";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  container: {},
  table: {
    minWidth: 650,
  },
});
const Leaderboard = (props) => {
  const classes = useStyles();
  const [leaderboard, setLeaderboard] = useState([]);
  let user;
  let quizId;
  console.log(props);
  try {
    if (
      props.quizId === undefined &&
      (props.state !== undefined || props.location.state !== undefined)
    ) {
      user = props.location.state.users;
    }
  } catch (e) {
    console.log(e);
  }
  try {
    if (props.quizId !== undefined) {
      quizId = props.quizId;
    }
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    if (quizId) {
      getLeaderboardByQuizId();
    } else if (user) {
      getLeaderboardByUserId();
    } else {
      getLeaderboardForAll();
    }
  }, [props]);
  const getLeaderboardByQuizId = async () => {
    let response;
    try {
      response = await getLeaderboardByQuiz(quizId);
      if (response.success) {
        setLeaderboard(response.message);
      }
    } catch (err) {
      toast(err.message);
    }
  };
  const getLeaderboardByUserId = async () => {
    let response;
    try {
      response = await getLeaderboardByUser(user.id);
      if (response.success) {
        setLeaderboard(response.message);
      }
    } catch (err) {
      toast(err.message);
    }
  };
  const getLeaderboardForAll = async () => {
    let response;
    try {
      response = await getLeaderboard(quizId);
      if (response.success) {
        setLeaderboard(response.message);
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="leaderboard">
        <TableHead>
          <TableRow>
            <TableCell> Rank </TableCell>
            <TableCell> Name </TableCell>
            {quizId || user ? <TableCell> Quiz </TableCell> : null}
            {quizId || user ? (
              <TableCell> Score </TableCell>
            ) : (
              <TableCell> Total Score </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard.map((elem, index) => {
            return (
              <TableRow key={elem._id}>
                <TableCell>{index + 1}</TableCell>
                {elem.name ? <TableCell>{elem.name}</TableCell> : null}
                {elem.title ? <TableCell>{elem.title}</TableCell> : null}
                {elem.Score !== undefined ? (
                  <TableCell>{elem.Score}</TableCell>
                ) : null}
                {elem.totalScore !== undefined ? (
                  <TableCell>{elem.totalScore}</TableCell>
                ) : null}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
