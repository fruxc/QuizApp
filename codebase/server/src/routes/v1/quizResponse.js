const router = require("express").Router();
const Response = require("../../models/quizResponse.model");
const user= require("../../models/user.model");
const verify = require("../../middleware/verifyToken");



// to get a leaderbaord for a quiz
router.route("/leaderboard/:quizId").get(verify,(req, res) => {
    const id =req.params.quizId;
    try{
      Response
      .find({ quizId: id })
      .sort("-Score")
      .limit(3)
      .then((result) =>{res.json({message:result,success:true})})
      .catch((err) => res.status(400).json({message:err,success:false}));
    }catch(err){
      res.send({message:"Something went wrong",success:false})
    }
  });


//Over all leaderboard of all quizes
router.route("/leaderboard").get(verify,async (req,res)=>{
  let users=await user.find({});
  var userMap = {};
  users.forEach(function(user) {
    userMap[user._id] = user.name;
  });
  
  let userIds=Object.keys(userMap)
  userIds.forEach(async(user)=>{
    const userQuizes=await Response.find({userId:user})
    // console.log(userQuizes)
    let totalScore=0
    userQuizes.forEach((quiz)=>{
      totalScore=totalScore+quiz.Score;
    })
    // console.log(totalScore)
    // userMap[user._id]['Score']=totalScore;
    // console.log(userMap)
  })
  res.send({userIds,userMap});  
})

// to submit response after user gives the quiz
  router.route("/submitResponse").post(verify,async (req, res) => {
    try{
      let quizId=req.body.quizId;
      let userId=req.body.userId;
      const alreadyExisting = await Response.findOne({quizId: quizId,userId:userId });
      if(alreadyExisting){
        let currentScore=parseInt(alreadyExisting["Score"], 10);
        let newScore=parseInt(req.body.Score)
        if(newScore>=currentScore){
          Response.updateOne({quizId: quizId,userId:userId },{Score:newScore})
          .then(async(updatedData)=>{
            let quizResponse=await Response.findOne({quizId: quizId,userId:userId });
            res.status(201).json({ message:quizResponse, success: true });
          })
          .catch((err)=>{
            res.send({ message: err, success: false });
          })
        }else{
          res.status(202).json({message:alreadyExisting,success:true})
        }
      }else{
        Response.create(req.body)
        .then((quizData) => {
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          return res.json({ message:quizData, success: true });
        })
        .catch((err) => {
          res.send({ message: err, success: false });
        });
      }
    }catch(err){
      res.status(500).json({message:"Error Connecting to the Server",success:false})
    }

  });



// to get quiz details using the username
  router.route("/attemptedQuiz/:userId").get(verify,(req, res) => {
    Response
    .find({ userId:req.params.userId})
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