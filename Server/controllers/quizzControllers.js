exports.showQuizz = async function (req, res) {
    try {
        const quizz = await Question.find()
        res.json(quizz)
    } catch (error) {
        console.log(error)
    }
}
=======
const Quizz = require("../models/quizzSchema.js");
exports.showQuizz = async function (req, res) {;
 try {
     const quizz = await Quizz.find()
     res.json(quizz)
 } catch (error) {
     console.log(error)
   }
};
>>>>>>> ba804aed94f64b313ca0fe004bf1cb6a300062f4
=======
const Quizz = require("../models/quizzSchema.js");
exports.showQuizz = async function (req, res) {;
 try {
     const quizz = await Quizz.find()
     res.json(quizz)
 } catch (error) {
     console.log(error)
   }
};
>>>>>>> ba804aed94f64b313ca0fe004bf1cb6a300062f4

exports.createQuizz = async function (req, res) {
    try {
        let newQuizz = new Quizz(req.body)
        let savedQuizz = await newQuizz.save()
    } catch (error) {
        throw error
    }
}