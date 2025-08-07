const express = require("express");
const app = express();
const connectDB = require("./connectDB/connectDB.js");
const question = require("./routers/questionRouter.js");
const quizz = require("./routers/quizzRouter.js");
const helmet = require("helmet");
const cors = require("cors");
const xss = require('xss-clean');
// veut pas s'importer
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

// Configuration du limiteur de requête

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
  standardHeaders: true, // Retourne les headers RateLimit standard
  legacyHeaders: false, // Désactive les headers obsolètes
});
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(limiter);

app.use("/question", question);
app.use("/quizz", quizz);

app.listen(PORT, () => {
  connectDB();
  // console.log(`${PORT} Lien Server`);
  // console.log(`${BASE_URL}/page Lien Page`);
});
