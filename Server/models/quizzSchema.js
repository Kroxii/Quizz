<<<<<<< HEAD:Server/models/quizzSchema.js
const { mongoose, Schema } = require("mongoose");
=======
const { mongoose } = require("mongoose");

>>>>>>> 7a242f1c712148d0240c05671c6af6e78996a2fc:Server/models/quizzShema.js
const quizz = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true },
  questions: [
    { type: Schema.Types.ObjectId, required: true, }
   ],
  },
);

module.exports = mongoose.model("Quizz", quizz);
