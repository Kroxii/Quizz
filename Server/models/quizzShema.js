const { mongoose } = require("mongoose");
const fs = require('fs');
const quizz = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true },
  questions: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

module.exports = mongoose.model("Quizz", quizz);
