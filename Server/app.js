const express = require("express");
const app = express();
const connectDB = require("./connectDB/connectDB.js");
const question = require("./routers/questionRouter.js");
const quizz = require("./routers/quizzRouter.js");
const helmet = require("helmet");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;


app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/question", question);
app.use("/quizz", quizz);

app.listen(PORT, () => {
  connectDB();
// console.log(`${PORT} Lien Server`);
// console.log(`${BASE_URL}/page Lien Page`);
});
