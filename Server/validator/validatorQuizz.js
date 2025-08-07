const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

module.exports = (req, res, next) => {
  console.log("🔥 Middleware validatorQuizz appelé");
  console.log("📦 Body reçu :", req.body);
  const validatorQuestion = Joi.object({
    title: Joi.string().min(3).required().messages({
      "string.base": "Le titre dois être une chaine de caractères ",
      "string.min": " Le titre est obligatoire",
    }),
    description: Joi.string().empty("Desciption Vide"),
    theme: Joi.string()
      .valid(
        "vocabulaire",
        "grammaire",
        "conjugaison",
        "culture et politesse",
        "mixte"
      )
      .empty("Desciption Vide")
      .messages({
        "any.only":
          "Le theme ne peux que être : Vocabulaire , Grammaire ,Conjugaison ,culture et politesse ou Mixte",
      }),
    level: Joi.string()
      .valid("A1", "A2", "B1", "B2", "C1", "C2")
      .required()
      .messages({
        "any.only": "Le niveau doit être A1,A2,B1,B2,C1,C2",
        "any.required": "Le niveau est obligatoire",
      }),
    questions: Joi.array()
      .items(JoiObjectId().required())
      .min(1)
      .required()
      .messages({
        "array.base": "erreur sélection de votre questions",
        "array.min": "Il faut au moins une question dans ce défi",
      }),
  });

  const { error } = validatorQuestion.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      error: error.details[0].message,
    });
  } else {
    next();
  }
};
