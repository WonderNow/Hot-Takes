const mongoose = require('mongoose');

// Utilisation de la méthode Schema de Mongoose afin de créer un schéma de données pour la base de données
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false }
});

// Utilisation de la méthode model afin de transformer le schéma ci-dessus en un modèle utilisable par Mongoose
module.exports = mongoose.model('Sauce', sauceSchema);