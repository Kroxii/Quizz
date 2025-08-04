module.exports = (req,res)=> {
    const quizz = Joi.object({
        title : Joi.string().min(2)
        })
}