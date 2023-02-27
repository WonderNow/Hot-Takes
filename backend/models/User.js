const mongoose = require('mongoose'); // Package permettant de gérer la base de données MongoDB
const uniqueValidator = require('mongoose-unique-validator');

// Utilisation de la méthode Schema de Mongoose afin de créer un schéma de données pour la base de données
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Ajout du package mongoose-unique-validator afin d'éviter les inscriptions multiples avec une même adresse e-mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); // Export du schéma sous forme de model grâce à la fonction 'model' de mongoose