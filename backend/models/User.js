const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schéma des utilisateurs grâce à la fonction 'Schema' de mongoose
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Ajout du package mongoose-unique-validator afin d'éviter les inscriptions multiples avec une même adresse e-mail
userSchema.plugin(uniqueValidator);

// Export du schéma sous forme de model grâce à la fonction 'model' de mongoose
module.exports = mongoose.model('User', userSchema); 