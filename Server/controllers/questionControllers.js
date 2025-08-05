const Question = require('../models/questionSchema.js')
exports.showQuestion = async function (req, res) {
    // res.send('<h1>coucou</h1>')
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (error) {
        console.log(error)
    }
}

exports.createQuestion = async function (req, res) {
    try {
        let newQuestion = new Question(req.body)
        let savedQuestion = await newQuestion.save()
        res.send(savedQuestion)
    } catch (error) {
        throw error
    }
}

exports.destroyQuestion = async function (req, res) {
    try {
        let delQuestion = await Question.findOneAndDelete({_id = })
    }
}