const express = require("express");
const router = express.Router();
const controller = require("../controllers/quizzControllers");


router.get("/", controller.showQuizz);
router.post("/", controller.createQuizz);

module.exports = router;
