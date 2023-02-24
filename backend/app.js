const express = require('express'); // Permet de créer un serveur Express
const mongoose = require('mongoose'); // Permet de se connecter à la base de données MongoDB
const path = require('path'); // Permet de gérer les chemins de fichiers
const app = express(); // Crée une instance d'application Express
const cors = require('cors'); // Permet de gérer les erreurs CORS
const helmet = require('helmet'); // Permet de sécuriser les en-têtes HTTP

const userRoutes = require('./routes/user'); // Importe le routeur pour les utilisateurs
const sauceRoutes = require('./routes/sauce'); // Importe le routeur pour les sauces

//Chargement des variables d'environnement
require('dotenv').config();

// Connexion à la base de données MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`,
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

app.use(cors()); // Middleware permettant de gérer les erreurs CORS

app.use(express.json()); // Middleware permettant de parser les requêtes entrantes

app.use(helmet()); // Middleware permettant de sécuriser les en-têtes HTTP


app.use('/api/auth', userRoutes); // Pour toutes les routes commençant par /api/auth, on utilise le routeur défini dans user.js
app.use('/api/sauces', sauceRoutes); // Pour toutes les routes commençant par /api/sauces, on utilise le routeur défini dans sauce.js
app.use('/images', express.static(path.join(__dirname, 'images'))), // Pour toutes les routes commençant par /images, on utilise le routeur défini dans sauce.js

// Exporte l'application Express pour qu'elle puisse être utilisée dans d'autres fichiers
module.exports = app;