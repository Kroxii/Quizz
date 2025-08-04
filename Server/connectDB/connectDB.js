<<<<<<< HEAD
const mongoose = require('mongoose')

function connectDB () {    
    mongoose.connect('mongodb+srv://Julien:quizz@cluster0.mkel2v3.mongodb.net/Quizz')
        .then(console.log('serveur mongodb connecté'))
        .catch(error=>console.log(error))
}

module.exports = connectDB
=======
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.PASSWORD,
    waitForConnections:true,
   
})
module.exports = pool.promise();
>>>>>>> d6ce2421d391d3381a3820c9e33bafc3eb28a43d
