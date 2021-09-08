const router = require("express").Router();
const Response = require("../../models/quizResponse.model");
const verify = require("../../middleware/verifyToken");

const {
  getLeaderboardOfQuiz,
  getLeaderboardOfAllUsers,
  submitResponse,
  getQuizDetailsOfUser,
} = require("../../services/quizResponse.services");

// to get a leaderbaord for a quiz
router.route("/leaderboard/:quizId").get(verify, async (req, res) => {
  try {
    const result = await getLeaderboardOfQuiz(req.params.quizId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).send(result);
    }
  } catch (err) {
    res.status(400).send({ message: "Something went wrong", success: false });
  }
});

//Over all leaderboard of all quizzes of user
router.route("/leaderboard").get(async (req, res) => {
  try {
    const leaderboardData = await getLeaderboardOfAllUsers();
    if (leaderboardData) {
      res.status(201).json(leaderboardData);
    } else {
      res.status(404).json({
        message: "something went wrong try again later",
        success: false,
      });
    }
  } catch (err) {
    res.status(400).send({ message: "Something went wrong", success: false });
  }
});

// to submit response after user gives the quiz
router.route("/submitResponse").post(verify, async (req, res) => {
  try {
    const submittedData = await submitResponse(
      req.body.quizId,
      req.body.userId,
      req.body.Score,
      req.body
    );
    if (submittedData) {
      res.status(201).json(submittedData);
    } else {
      res.status(400).send({ message: "Something went wrong", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: "Something went wrong", success: false });
  }
});

// to get quiz details using the userId
router.route("/attemptedQuiz/:userId").get(verify, async (req, res) => {
  try {
    const submittedData = await getQuizDetailsOfUser(req.params.userId);
    if (submittedData) {
      res.status(200).json(submittedData);
    } else {
      res.status(400).send({ message: "problem with server", success: false });
    }
  } catch (err) {
    res.status(400).send({ message: "Something went wrong", success: false });
  }
});

module.exports = router;
