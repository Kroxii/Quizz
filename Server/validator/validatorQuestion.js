module.exports = (req, res, next) => {
  const validatorQuestion = Joi.object({
    lablel: Joi.String().min(3).required(),
    theme: Joi.String().min(3).required(),
    level: Joi.String()
      .valid("A1", "A2", "B1", "B2", "C1", "C2")
      .required()
      .message({
        "any.only": "Le niveau doit être A1,A2,B1,B2,C1,C2",
        "any.required": "Le niveau est obligatoire",
      }),
    choix: Joi.array().items(
      Joi.object({
        label: Joi.String().min(2).required(),
        good: Joi.boolean.required(),
      })
        .min(1)
        .required()
    ),
  });

  const { error, value } = validatorQuestion.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.detail[0].message });
  } else {
    next();
  }
};
