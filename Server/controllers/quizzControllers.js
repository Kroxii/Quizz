const Quizz = require("../models/quizzSchema.js");
exports.showQuizz = async function (req, res) {;
 try {
     const quizz = await Quizz.find()
     res.json(quizz)
 } catch (error) {
     console.log(error)
   }
};

exports.createQuizz = async function (req, res) {
  try {
    let newQuizz = new Quizz(req.body);
    let savedQuizz = await newQuizz.save();
  } catch (error) {
    throw error;
  }
};
