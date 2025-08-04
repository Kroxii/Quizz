const { mongoose } = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb+srv://lnina00066:0000@cluster0.mkel2v3.mongodb.net/")
    .then(console.log("serveur mongodb connecté"))
    .catch((error) => console.log(error));
}
let db;
async function connect() {
  await client.connect();
  db = client.db("Quizz");
  console.log("Connectée à la bases de donnée ");
}

function getDb() {
  return db;
}
module.exports = { connectDB, getDb };
