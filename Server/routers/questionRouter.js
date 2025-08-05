const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionControllers");


router.get("/",controller.showQuestion)
router.post("/",controller.createQuestion)
router.delete("/delete/:id",controller.destroyQuestion)

module.exports = router;
