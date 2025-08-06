const express = require("express");
const router = express.Router();
const controller = require("../controllers/quizzControllers");
const validatorQuizz = require("../validator/validatorQuizz")

router.get("/", controller.showQuizz);
<<<<<<< HEAD
router.post("/", controller.createQuizz);
=======
router.post("/", validatorQuizz, controller.createQuizz);
>>>>>>> 7a242f1c712148d0240c05671c6af6e78996a2fc
// supp Quizz 
module.exports = router;
