const mongoose = require('mongoose');

// Utilisation de la méthode Schema de Mongoose afin de créer un schéma de données pour la base de données
const sauceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// Utilisation de la méthode model afin de transformer le schéma ci-dessus en un modèle utilisable par Mongoose
module.exports = mongoose.model('Sauce', sauceSchema);