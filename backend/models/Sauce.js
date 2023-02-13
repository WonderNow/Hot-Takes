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
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLikes: { type: String, required: true },
  usersDisliked: { type: String, required: true },
});

// Utilisation de la méthode model afin de transformer le schéma ci-dessus en un modèle utilisable par Mongoose
module.exports = mongoose.model('Sauce', sauceSchema);