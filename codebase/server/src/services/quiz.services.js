const Quizes = require("../models/quiz.model");

const getAllQuizzes=async()=>{
    try{
        const quizzes=await Quizes.find({});
        if(quizzes){
            return { message: quizzes, success: true }
        }else{
            return { message: "problem with server", success: false }
        }
    }catch(err){
        return { message: "problem with server", success: false }
    }
}


const createQuiz=async(quiz)=>{
    try{
        const createdQuiz=await Quizes.create(quiz);
        if(createdQuiz){
            return { message: createdQuiz, success: true }
        }
        else{
            return { message: "error while creating quiz", success: false }
        }
    }catch(err){
        return { message: err, success: false }
    }
}


const getSingleQuiz=async(quizId)=>{
    try{
        const quiz= await Quizes.findById(quizId);
        if(quiz){
            return { message: quiz, success: true }
        }
        else{
            return { message: "wrong QuizId", success: false }
        }
    }catch(err){
        return { message: err, success: false }
    }
}

const deleteSingleQuiz=async(quizId)=>{
    try{
        const quiz= await Quizes.findByIdAndRemove(quizId);
        if(quiz){
            return { message: quiz, success: true }
        }
        else{
            return { message: "wrong QuizId", success: false }
        }
    }catch(err){
        return { message: err, success: false }
    }
}


const updateQuiz=async(quizId,newQuiz)=>{
    try{
        const quiz=await Quizes.findByIdAndUpdate(
            quizId,
            {
              $set: newQuiz,
            },
            { new: true }
          );
        if(quiz){
            return { message: quiz, success: true }
        }else{
            return { message: "wrong QuizId", success: false }
        }
    }catch(err){
        return { message: err, success: false }
    }
}


const addQuestionToQuiz=async(quizId,question)=>{
    try{
        const quiz= await Quizes.findById(quizId);
        if(quiz != null){
            quiz.questions.push(question);
            const updatedQuiz= await quiz.save();
            if(updatedQuiz){
                const newQuiz=await Quizes.findById(updatedQuiz._id);
                if(newQuiz){
                    return { message: newQuiz, success: true }
                }else{
                    return { message: "problem with server", success: false }
                }
            }else{
                return { message: "problem while saving the question", success: false }
            }

        }else{
            err = new Error("Quiz " + quizId + " not found");
            err.statusCode = 404;
            return { message: err, success: false }
        }
    }catch(err){
        return { message: err, success: false }
    }
}


const getSingleQuestion= async(quizId,questionId)=>{
    try{
        const quiz= await Quizes.findById(quizId);
        if(quiz){
            if (quiz != null && quiz.questions.id(questionId) != null){
                return {
                    message: quiz.questions.id(req.params.questionId),
                    success: true,
                  }
            }

        }else{
            err = new Error("Quiz " + quizId + " not found");
            err.statusCode = 404;
            return { message: err, success: false }
        }
    }catch(err){
        return { message: "Something went wrong", success: false }
    }
}


const updateSingleQuestion= async(req,quizId,questionId)=>{
    try{
        const quiz= await Quizes.findById(quizId);
        if (quiz != null && quiz.questions.id(questionId) != null){
            if (req.body.question) {
                quiz.questions.id(questionId).question = req.body.question;
            }
            if (req.body.answers) {
                quiz.questions.id(questionId).answers = req.body.answers;
            }
            if (req.body.answer) {
                quiz.questions.id(questionId).answer = req.body.answer;
            }
            const newQuiz=await quiz.save();
            if(newQuiz){
                const updatedQuiz=await Quizes.findById(newQuiz._id);
                if(updatedQuiz){
                    return {
                        message: updatedQuiz.questions.id(questionId),
                        success: true
                      }
                }else{
                    return {
                        message: "error while connecting to the database",
                        success: false
                      }
                }
            }else if (newQuiz == null){
                err = new Error("Quiz " + req.params.quizId + " not found");
                err.statusCode = 404;
                return { message: err, success: false }
            }else{
                err = new Error("Question " + req.params.questionId + " not found");
                err.statusCode = 404;
                return { message: err, success: false }
            }
        }else{
            return { message: "wrong quiz ID", success: false }
        }
    }catch(err){
        return { message: "Something went wrong", success: false }
    }
}



const deleteSingleQuestion= async(quizId,questionId)=>{
    try{
        const quiz= await Quizes.findById(quizId);
        if (quiz != null && quiz.questions.id(questionId) != null){
            quiz.questions.id(questionId).remove();
            const newQuiz=await quiz.save();
            if(newQuiz){
                const updatedQuiz=await Quizes.findById(newQuiz._id);
                if(updatedQuiz){
                    return {
                        message: updatedQuiz,
                        success: true
                      }
                }else{
                    return {
                        message: "error while connecting to the database",
                        success: false
                      }
                }
            }else if (newQuiz == null){
                err = new Error("Quiz " + req.params.quizId + " not found");
                err.statusCode = 404;
                return { message: err, success: false }
            }else{
                err = new Error("Question " + req.params.questionId + " not found");
                err.statusCode = 404;
                return { message: err, success: false }
            }
        }else{
            return { message: "wrong quiz ID", success: false }
        }
    }catch(err){
        return { message: "Something went wrong", success: false }
    }
}


module.exports = {
    getAllQuizzes,createQuiz,getSingleQuiz,deleteSingleQuiz,updateQuiz,
    addQuestionToQuiz,getSingleQuestion,updateSingleQuestion,deleteSingleQuestion
}