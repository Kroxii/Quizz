const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  theme: { type: String, required: true },
  level: { type: String, required: true },
  choix: [
    {
      label: { type: String, required: true },
      good: { type: Boolean, required: true },
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;