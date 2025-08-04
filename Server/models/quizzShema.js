const quizSchema = Joi.object({
  title: Joi.string().min(2).required(),
  level: Joi.string().min(1).required(),
  questions: Joi.array().items(questionSchema).min(1).required(),
});
module.exports = (req, res) => {
  const { error, value } = quizSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return res.status(200).json({ message: "Quiz créé !", data: value });
};
