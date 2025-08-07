const express = require("express");
const app = express();
const port = 3000;
const connectDB  = require("./connectDB/connectDB.js");
const question = require("./routers/questionRouter.js");
const quizz = require("./routers/quizzRouter.js");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/question", question);
app.use("/quizz", quizz);

app.get("/", (req, res) => {
  res.send("a");
});

app.listen(port, () => {
  connectDB();
  console.log("http://localhost:" + port );
  console.log("http://127.0.0.1:5500/Front/" );
});
