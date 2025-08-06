const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionControllers");
const validatorQuestion = require("../validator/validatorQuestion");

router.get("/", controller.showQuestion);
router.post("/", controller.createQuestion, validatorQuestion);
router.delete("/delete/:id", controller.destroyQuestion);
router.patch("/update/:id",controller.updateQuestion)

module.exports = router;
