const Response = require("../models/quizResponse.model");


const getLeaderboardOfQuiz=async(id)=>{
    try{
        const result=await Response.find({ quizId: id })
        .sort("-Score")
        .limit(3)
        if(result){
            return { message: result, success: true }
        }else{
            return { message: err, success: false }
        }
    }catch(err){
        return { message: "Something went wrong try again later", success: false }
    }
}


const getLeaderboardOfAllUsers=async()=>{
    try{
        const leaderboardData= await Response.aggregate([
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
            .exec();
        if(leaderboardData){
            return { message: leaderboardData, success: true }
        }else{
            return {
                message: "something went wrong try again later",
                success: false,
              }
        }
    }catch(err){
        return { message: "Something went wrong try again later", success: false }
    }
}



const submitResponse=async(quizId,userId,Score,quizResponseData)=>{
    try{
        const alreadyExisting = await Response.findOne({
            quizId: quizId,
            userId: userId,
          });
        if(alreadyExisting){
            let currentScore = parseInt(alreadyExisting["Score"], 10);
            let newScore = parseInt(Score);
            if(newScore > currentScore){
                await Response.findOneAndUpdate(
                    { quizId: quizId, userId: userId },
                    { $push: { allScores: currentScore } }
                  );
                const updatedData= await Response.updateOne(
                    { quizId: quizId, userId: userId },
                    { Score: newScore }
                  );
                if(updatedData){
                    let quizResponse = await Response.findOne({
                        quizId: quizId,
                        userId: userId,
                      });
                    return { message: quizResponse, success: true }
                }else{
                    return { message: "error occured while submitting the response", success: false }
                }
            }else{
                const updatedData= await Response.findOneAndUpdate(
                    { quizId: quizId, userId: userId },
                    { $push: { allScores: newScore } }
                  );
                if(updatedData) {
                    let quizResponse = await Response.findOne({
                        quizId: quizId,
                        userId: userId,
                      });
                    if(quizResponse){
                        return { message: quizResponse, success: true }
                    }else{
                        return { message: "error occured while submitting the response", success: false }
                    }
                }
            }
        }else{
            const quizData= await Response.create(quizResponseData);
            if(quizData){
                return { message: quizData, success: true }
            }else{
                return { message: "error occured while submitting the response", success: false }
            }
        }
    }catch(err){
        return { message: "Something went wrong try again later", success: false }
    }
}



const getQuizDetailsOfUser=async(userId)=>{
    try{
        const quiz= await Response.find({ userId: userId });
        if(quiz){
            return { message: quiz, success: true }
        }else{
            return { message: "userId does not exists", success: true }
        }
    }catch(err){
        return { message: "Something went wrong try again later", success: false }
    }
}


module.exports={
    getLeaderboardOfQuiz,getLeaderboardOfAllUsers
    ,submitResponse,getQuizDetailsOfUser
}