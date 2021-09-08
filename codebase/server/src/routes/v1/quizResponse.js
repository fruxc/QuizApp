const router = require("express").Router();
const Response = require("../../models/quizResponse.model");
const user = require("../../models/user.model");
const verify = require("../../middleware/verifyToken");

// to get a leaderbaord for a quiz
router.route("/leaderboard/:quizId").get(verify, (req, res) => {
  const id = req.params.quizId;
  try {
    Response.find({ quizId: id })
      .sort("-Score")
      .limit(3)
      .then((result) => {
        res.json({ message: result, success: true });
      })
      .catch((err) => res.status(400).json({ message: err, success: false }));
  } catch (err) {
    res.send({ message: "Something went wrong", success: false });
  }
});

//Over all leaderboard of all quizes of user
router.route("/leaderboard").get(async (req, res) => {
  Response.aggregate([
    {
      $group: {
        _id: "$userId",
        score_count: { $sum: "$Score" },
        data: { $first: "$$ROOT" },
      },
    },
    {
      $project: {
        totalScore: "$score_count",
        name: "$data.name",
      },
    },
    {
      $sort: { totalScore: -1 },
    },
    {
      $limit: 10,
    },
  ])
    .exec()
    .then((leaderboardData) => {
      res.status(201).json({ message: leaderboardData, success: true });
    })
    .catch((err) => {
      res
        .status(404)
        .json({
          message: "something went wrong try again later",
          success: false,
        });
    });
});

// to submit response after user gives the quiz
router.route("/submitResponse").post(verify, async (req, res) => {
  try {
    let quizId = req.body.quizId;
    let userId = req.body.userId;
    const alreadyExisting = await Response.findOne({
      quizId: quizId,
      userId: userId,
    });
    if (alreadyExisting) {
      let currentScore = parseInt(alreadyExisting["Score"], 10);
      let newScore = parseInt(req.body.Score);
      if (newScore > currentScore) {
        await Response.findOneAndUpdate(
          { quizId: quizId, userId: userId },
          { $push: { allScores: currentScore } }
        );
        Response.updateOne(
          { quizId: quizId, userId: userId },
          { Score: newScore }
        )
          .then(async (updatedData) => {
            let quizResponse = await Response.findOne({
              quizId: quizId,
              userId: userId,
            });
            res.status(201).json({ message: quizResponse, success: true });
          })
          .catch((err) => {
            res.send({ message: err, success: false });
          });
      } else {
        Response.findOneAndUpdate(
          { quizId: quizId, userId: userId },
          { $push: { allScores: newScore } }
        )
          .then(async (updatedData) => {
            let quizResponse = await Response.findOne({
              quizId: quizId,
              userId: userId,
            });
            res.status(201).json({ message: quizResponse, success: true });
          })
          .catch((err) => {
            res.send({ message: err, success: false });
          });
      }
    } else {
      Response.create(req.body)
        .then((quizData) => {
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          return res.json({ message: quizData, success: true });
        })
        .catch((err) => {
          res.send({ message: err, success: false });
        });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Connecting to the Server", success: false });
  }
});

// to get quiz details using the username
router.route("/attemptedQuiz/:userId").get(verify, (req, res) => {
  Response.find({ userId: req.params.userId })
    .then((quiz) => {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      return res.json({ message: quiz, success: true });
    })
    .catch((err) => {
      res.send({ message: err, success: false });
    });
});

module.exports = router;
