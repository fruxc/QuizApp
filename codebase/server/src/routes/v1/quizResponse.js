const router = require("express").Router();
const Response = require("../../models/quizResponse.model");
const verify = require("../../middleware/verifyToken");



// to get a leaderbaord for a quiz
router.route("/leaderboard/:quizId").get(verify,(req, res) => {
    const id =req.params.quizId;
    try{
      Response
      .find({ quizId: id })
      .sort("-Score")
      .then((result) =>{res.json({message:result.slice(0,3),success:true})})
      .catch((err) => res.status(400).json({message:err,success:false}));
    }catch(err){
      res.send({message:"Something went wrong",success:false})
    }
  });



// to submit response after user gives the quiz
  router.route("/submitResponse").post(verify,(req, res) => {
    Response.create(req.body)
    .then((quizData) => {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      return res.json({ message:quizData, success: true });
    })
    .catch((err) => {
      res.send({ message: err, success: false });
    });
  });



// to get quiz details using the username
  router.route("/attemptedQuiz/:userName").get(verify,(req, res) => {
    const name =req.params.userName;
    Response
    .find({ name:name})
    .then((quiz) => {
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    return res.json({ message:quiz, success: true });
  })
  .catch((err) => {
    res.send({ message: err, success: false });
  });
  });
  module.exports = router;