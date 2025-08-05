const express = require("express");
const router = express.Router();
const db = require("../connectDB/protection");
const controller = require("../controllers/quizzControllers");


router.get("/", controller.showQuizz);
router.post("/", controller.createQuizz);

module.exports = router;
