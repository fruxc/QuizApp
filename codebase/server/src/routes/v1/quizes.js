const express = require('express');
const bodyParser = require('body-parser');
const router = require("express").Router();


const verify = require("../../middleware/verifyToken");
const Quizes = require("../../models/quiz.model");


router.use(bodyParser.json());


//get all quizes
router.route("/").get(verify,(req,res)=>{
    Quizes.find({})
        .then((quizes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({message:quizes,success: true});
        })
        .catch((err) => res.send({"message":"problem with server",success: false}));
});



// create a new quiz 
router.route("/").post(verify, (req, res) => {
    Quizes.create(req.body)
        .then((quiz) => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            return res.json({message:quiz,success: true});
        }).catch((err) => {res.send({"message":err,success: false})});
}) 


// get a quiz based on id
router.route("/:quizId").get(verify,(req, res) => {
    Quizes.findById(req.params.quizId)
        .then((quiz) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({message:quiz,success: true});
        }).catch((err) => res.send({"message":"wrong QuizId",success: false}));
})


//delete quiz based on a quizId
router.route("/:quizId").delete(verify, (req, res) => {
    Quizes.findByIdAndRemove(req.params.quizId)
        .then((quiz) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({message:quiz,success: true});
        }).catch((err) => res.json({"message":"wrong QuizId",success: false}));
});


//update quiz based on quizId
router.route("/:quizId").put(verify,(req,res)=>{
    Quizes.findByIdAndUpdate(req.params.quizId, {
        $set: req.body
    }, { new: true })
        .then((quiz) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({message:quiz,success: true});
        }).catch((err) => res.json({"message":"wrong QuizId",success: false}));
});



// add a new question in a quiz with quizid 
router.route("/:quizId/questions").post(verify, (req, res) => {
    Quizes.findById(req.params.quizId)
        .then((quiz) => {
            if (quiz != null) {
                quiz.questions.push(req.body);
                quiz.save()
                    .then((quiz) => {
                        Quizes.findById(quiz._id)
                            .then((quiz) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                return res.json({message:quiz,success: true});
                            })
                    }, (err) => res.send({"message":"problem with server",success: false}));
            }
            else {
                err = new Error('Quiz ' + req.params.quizId + ' not found');
                err.statusCode = 404;
                return res.json({"message":err,success:false})
            }
        }).catch((err) => res.send({"message":"Something wrong happened",success: false}));
})



//delete all the questions in a quiz 
router.route("/:quizId/questions").delete(verify, (req, res) => {
    Quizes.findById(req.params.quizId)
        .then((quiz) => {
            if (quiz != null) {
                for (var i = (quiz.questions.length - 1); i >= 0; i--) {
                    quiz.questions.id(quiz.questions[i]._id).remove();
                }
                quiz.save()
                    .then((quiz) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({message:quiz,success: true});
                    }, (err) => res.send({"message":err,success: false}));
            }
            else {
                err = new Error('Quiz ' + req.params.quizId + ' not found');
                err.statusCode = 404;
                return res.json({"message":err,success:false})
            }
        }).catch((err) => res.send({"message":"Something wrong happened",success: false}));
});



// get a question with questionId in a quiz with quizid 
router.route("/:quizId/questions/:questionId").get(verify,(req, res) => {
    Quizes.findById(req.params.quizId)
        .then((quiz) => {
            if (quiz != null && quiz.questions.id(req.params.questionId) != null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({message:quiz.questions.id(req.params.questionId),success:true});
            }
            else if (quiz == null) {
                err = new Error('Quiz ' + req.params.quizId + ' not found');
                err.statusCode = 404;
                return res.send({"message":err,success: false})
            }
            else {
                err = new Error('Quiz ' + req.params.quizId + ' not found');
                err.statusCode = 404;
                return res.send({"message":err,success: false})
            }
        }).catch((err) => res.send({"message":"Something wrong happened",success: false}));
})

// update a question in a quiz 
router.route("/:quizId/questions/:questionId").put(verify, (req, res) => {
    Quizes.findById(req.params.quizId)
        .then((quiz) => {
            if (quiz != null && quiz.questions.id(req.params.questionId) != null) {
                if (req.body.question) {
                    quiz.questions.id(req.params.questionId).question = req.body.question;
                }
                if (req.body.answers) {
                    quiz.questions.id(req.params.questionId).answers = req.body.answers;
                }
                if (req.body.answer) {
                    quiz.questions.id(req.params.questionId).answer = req.body.answer;
                }
                quiz.save()
                    .then((quiz) => {
                        Quizes.findById(quiz._id)
                            .then((quiz) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                return res.json({message:quiz.questions.id(req.params.questionId),success:true});
                            })
                    }, (err) => res.json({"message":err,success:false}));
            }
            else if (quiz == null) {
                err = new Error('Quiz ' + req.params.quizId + ' not found');
                err.statusCode = 404;
                return res.json({"message":err,success:false})
            }
            else {
                err = new Error('Question ' + req.params.questionId + ' not found');
                err.statusCode = 404;
                return res.json({"message":err,success:false})
            }
        }).catch((err) => res.json({"message":err,success:false}));
})



// Delete a question in a quiz 
router.route("/:quizId/questions/:questionId").delete(verify, (req, res) => {
    Quizes.findById(req.params.quizId)
        .then((quiz) => {
            if (quiz != null && quiz.questions.id(req.params.questionId) != null) {
                quiz.questions.id(req.params.questionId).remove();
                quiz.save()
                    .then((quiz) => {
                        Quizes.findById(quiz._id)
                            .then((quiz) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                return res.json({message:quiz,success:true});
                            })
                    }, (err) => res.json({"message":err,success:false}));
            }
            else if (quiz == null) {
                err = new Error('Quiz ' + req.params.quizId + ' not found');
                err.statusCode = 404;
                return res.json({message:err,success:false})
            }
            else {
                err = new Error('Question ' + req.params.questionId + ' not found');
                err.statusCode = 404;
                return res.json({message:err,success:false})
            }
        }).catch((err) => res.json({"message":err,success:false}));
});



module.exports=router;