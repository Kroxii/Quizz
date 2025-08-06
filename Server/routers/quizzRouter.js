const express = require("express");
const router = express.Router();
const controller = require("../controllers/quizzControllers");
const validatorQuizz = require("../validator/validatorQuizz")

router.get("/", controller.showQuizz);
router.post("/", validatorQuizz, controller.createQuizz);
// supp Quizz 
module.exports = router;
