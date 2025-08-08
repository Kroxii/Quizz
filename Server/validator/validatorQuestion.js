const Joi = require('joi')


module.exports = (req, res, next) => {
  console.log("🔥 Middleware validatorQuestion appelé");
  console.log("📦 Body reçu :", req.body);

  const validatorQuestion = Joi.object({
    label: Joi.string().min(3).required().messages({
      "string.only": "il vous faut au moins 3 caractères question vide",
      "any.required": "Le champ est obligatoire",
    }),
    theme: Joi.string().min(3).required().messages({
      "string.min": "Il vous faut au moins 3 caractères pour le thème.",
      "any.required": "Le thème est obligatoire.",
    }),
    level: Joi.string()
      .valid("A1", "A2", "B1", "B2", "C1", "C2")
      .required()
      .messages({
        "any.only": "Le niveau doit être A1,A2,B1,B2,C1,C2",
        "any.required": "Le niveau est obligatoire",
      }),
    choix: Joi.array().items(
      Joi.object({
        label: Joi.string().min(2).required(),
        good: Joi.boolean().optional(),
      })
        .min(1)
        .required()
        .messages({
          "array.min": "Il faut au moins un choix.",
          "any.required": "Le tableau de choix est obligatoire.",
        })
    ),
  });

  const { error } = validatorQuestion.validate(req.body);

  if (error) {
    console.log("🛑 Erreur Joi :", error.details);
    return res.status(400).json({ error: error.details[0].message });
  } else {
    console.log("✅ Validation OK, données :", req.body);
    next();
  }
};
