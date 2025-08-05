module.exports = (req, res) => {
  const validatorQuestion = Joi.object({
    title: Joi.String().min(3).required().message({
      "string.bases": "Le titre dois être une chaine de caractères ",
      "any.min": " Le titre est obligatoire",
    }),
    level: Joi.String()
      .valid("A1", "A2", "B1", "B2", "C1", "C2")
      .required()
      .message({
        "any.only": "Le niveau doit être A1,A2,B1,B2,C1,C2",
        "any.required": "Le niveau est obligatoire",
      }),
    questions: Joi.array()
      .items(JoiObjectId().required())
      .min(1)
      .required()
      .messages({
        "array.base": "erreur slection de votre questions",
        "array.min": "Il faut au moins une question dans ce défi",
      }),
  });

  const { error, value } = validatorQuestion.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.detail[0].message });
  } else {
    res.status(200).json({ message: "Question bien crée !", data: value });
  }
};
