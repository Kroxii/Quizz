const mongoose = require('mongoose')

function connectDB () {    
    mongoose.connect('mongodb+srv://Julien:quizz@cluster0.mkel2v3.mongodb.net/Quizz')
        .then(console.log('serveur mongodb connecté'))
        .catch(error=>console.log(error))
}

module.exports = connectDB