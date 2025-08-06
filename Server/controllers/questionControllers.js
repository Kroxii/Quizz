const Question = require('../models/questionSchema.js')
exports.showQuestion = async function (req, res) {
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (error) {
        console.log(error)
    }
}

exports.getQuestion = (req,res)=> {
    

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
        await Question.findOneAndDelete({_id: req.params.id })
        res.end()
    } catch (error) {
        throw error
    }
}