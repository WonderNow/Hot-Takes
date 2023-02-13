const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const userRoutes = require('./routes/user');
const sauceRoutes = require('.routes/sauce');

// Connexion à la base de données MongoDB Atlas
mongoose.connect('mongodb+srv://tom:tom123@cluster0.ggs1w0m.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Headers permettant des requêtes cross-origin et empêchant les erreurs CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Extraction du corps JSON de la requête
app.use(express.json());

// Routeurs
app.use('/api/auth', userRoutes);
app.use('/api/sauce', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))),

module.exports = app;