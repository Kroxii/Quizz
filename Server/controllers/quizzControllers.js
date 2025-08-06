exports.showQuizz = async function (req, res) {
    try {
        const quizz = await Question.find()
        res.json(quizz)
    } catch (error) {
        console.log(error)
    }
}

exports.createQuizz = async function (req, res) {
    try {
        let newQuizz = new Quizz(req.body)
        let savedQuizz = await newQuizz.save()
    } catch (error) {
        throw error
    }
}