const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizResponse = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'quizzes',
    required: true
  },
  
  title: {
    type: String,
    required: true
  },
  name: {
  type: String,
  required: true,
  trim: true
  },
  Score : {
    type: Number,
    required: true,
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  allScores:[]
});

const Response = mongoose.model("Response", quizResponse);

module.exports = Response;