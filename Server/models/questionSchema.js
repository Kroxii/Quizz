const Joi = require("joi");

module.exports = (req, res) => {
  const questionSchema = Joi.object({
    label: Joi.string().min(2).required(),
    theme: Joi.string().min(2).max(40).required(),
    level: Joi.string().min(1).required(),
    choix: Joi.array()
      .items(
        Joi.object({
          label: Joi.string().min(1).required(),
          bool: Joi.boolean().required(),
        })
      )
      .min(1)
      .required(),
  });
  const { error, value } = questionchema.valid(req.body);
  if (error) {
    return res.status(400).json({ error: error.detail[0].message });
  }
  return res.status(200).json({ message: " Question crée! ", data: value });
};
