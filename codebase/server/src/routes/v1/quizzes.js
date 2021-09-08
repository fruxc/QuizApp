const express = require("express");
const bodyParser = require("body-parser");
const router = require("express").Router();

const verify = require("../../middleware/verifyToken");

const {getAllQuizzes,createQuiz,getSingleQuiz,deleteSingleQuiz,updateQuiz,
      addQuestionToQuiz,getSingleQuestion,updateSingleQuestion,deleteSingleQuestion
       }=require('../../services/quiz.services')

router.use(bodyParser.json());


//get all quizes
router.route("/").get(async(req, res) => {
  const QuizzesData= await getAllQuizzes();
  if(QuizzesData.success){
    res.status(200).send(QuizzesData)
  }else{
    res.status(400).send(QuizzesData)
  }
});

// create a new quiz
router.route("/").post(verify, async(req, res) => {
  try{
    const quiz=await createQuiz(req.body);
    if(quiz.success){
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      return res.json(quiz);
    }else{
      return res.status(400).send(quiz)
    }
  }catch(err){
    res.send({ message: err, success: false });
  }
});

// get a quiz based on id
router.route("/:quizId").get(verify, async(req, res) => {
  try{
    const QuizzesData= await getSingleQuiz(req.params.quizId);
    if(QuizzesData.success){
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(QuizzesData)
    }else{
      res.status(400).send(QuizzesData)
    }
  }catch(err){
    res.send({ message: err, success: false });
  }
});

//delete quiz based on a quizId
router.route("/:quizId").delete(verify, async(req, res) => {
  try{
    const QuizzesData= await deleteSingleQuiz(req.params.quizId);
    if(QuizzesData.success){
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(QuizzesData)
    }else{
      res.status(400).send(QuizzesData)
    }
  }catch(err){
    res.send({ message: err, success: false });
  }
});




//update quiz based on quizId
router.route("/:quizId").put(verify, async(req, res) => {
  try{
    const updatedQuizData= await updateQuiz(req.params.quizId,req.body)
    if(updatedQuizData.success){
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(updatedQuizData);
    }else{
      res.status(400).send(updatedQuizData);
    }
  }catch(err){
    res.send({ message: err, success: false });
  }
});

// add a new question in a quiz with quizid
router.route("/:quizId/questions").post(verify, async(req, res) => {
  try{
    const newQuiz=await addQuestionToQuiz(req.params.quizId,req.body)
    if(newQuiz.success){
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json(newQuiz);
    }else{
      res.send(newQuiz)
    }
  }catch(err){
    res.send({ message: err, success: false });
  }
});


// update a question in a quiz
router.route("/:quizId/questions/:questionId").put(verify, async(req, res) => {
  try{
    const newQuestion=await updateSingleQuestion(req,req.params.quizId,req.params.questionId);
    if(newQuestion.success){
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(newQuestion);
    }else{
      res.status(400).send(newQuestion)
    }
  }catch(err){
    res.status(400).send({ message: err, success: false })
  }
});



// Delete a question in a quiz
router.route("/:quizId/questions/:questionId").delete(verify, async(req, res) => {
  try{
    const newQuestion=await deleteSingleQuestion(req.params.quizId,req.params.questionId);
    if(newQuestion.success){
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(newQuestion);
    }else{
      res.status(400).send(newQuestion)
    }
  }catch(err){
    res.status(400).send({ message: err, success: false })
  }
  });

module.exports = router;
