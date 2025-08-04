const express = require("express");
const router = express.Router();
const db = require("../connectDB/protection");
const controller = require("../controllers/quizzControllers");
const [rows] = await db.query("SELECT * FROM users");
console.log(rows);

router.get("/", controller.showQuizz);
router.post("/", controller.createQuizz);

module.exports = router;
