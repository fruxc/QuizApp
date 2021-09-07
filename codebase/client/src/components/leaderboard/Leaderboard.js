import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
} from "@material-ui/core";
import { getLeaderboardByQuiz } from "../../services/QuizService";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  container: {},
  table: {
    minWidth: 650,
  },
});
const Leaderboard = ({ quizId }) => {
  const classes = useStyles();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getLeaderboardByQuizId();
  }, []);
  const getLeaderboardByQuizId = async () => {
    let response;
    try {
      response = await getLeaderboardByQuiz(quizId);
      if (response.success) {
        setLeaderboard(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="leaderboard">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quiz</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard.map((elem, index) => {
            return (
              <TableRow key={elem._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{elem.name}</TableCell>
                <TableCell>{elem.title}</TableCell>
                <TableCell>{elem.Score}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
