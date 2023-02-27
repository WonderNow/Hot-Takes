const mongoose = require('mongoose'); // Package permettant de gérer la base de données MongoDB

// Utilisation de la méthode Schema de Mongoose afin de créer un schéma de données pour la base de données
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  // Like - Dislike
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false }
});

module.exports = mongoose.model('Sauce', sauceSchema); // Export du schéma sous forme de model grâce à la fonction 'model' de mongoose