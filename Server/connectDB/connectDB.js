const { mongoose } = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://lnina00066:0000@cluster0.mkel2v3.mongodb.net/Quizz?retryWrites=true&w=majority&appName=Cluster0"
  );
  try {
    console.log("serveur mongodb connecté");
  } catch (error) {
    console.log(error);
  }
}


module.exports =  connectDB ;
