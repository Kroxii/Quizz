const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionControllers");
const validatorQuestion = require("../validator/validatorQuestion");

router.get("/", controller.showQuestion);
router.post("/",validatorQuestion, controller.createQuestion);
router.delete("/delete/:id", controller.destroyQuestion);
router.put("/update/:id",validatorQuestion,controller.replaceQuestion)

module.exports = router;
