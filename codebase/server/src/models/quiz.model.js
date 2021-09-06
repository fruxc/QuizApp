const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema to store the options of the question
const optionSchema = new Schema({
  option: {
    type: String,
    required: true
  }
});


// schema to store the the question
const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [optionSchema],

    answer: {
      type: String,
      required: true
    }

}, {
    timestamps: true
});


//actual quiz schema
const quizSchema = new Schema({
  title: {
      type: String,
      required: true
  },

  description: {
      type: String
  },
  category :{
    type:String,
    required: true
  },

  questions: [questionSchema],

  duration :{
    hours : {
      type : Number,
      default: 0
    },

    minutes : {
      type : Number,
      default: 30
    },

    seconds : {
      type : Number,
      default: 0
    }

  }
}, {
  timestamps: true
});

var Quizes = mongoose.model('quizes', quizSchema);

module.exports = Quizes;