const express = require('express'); // Package permettant de créer un serveur Express et de gérer les requêtes et les réponses HTTP
const router = express.Router(); // Crée un routeur Express

const userCtrl = require('../controllers/user'); // Importe le contrôleur d'utilisateur

// Définit les routes pour les différentes requêtes HTTP
router.post('/signup', userCtrl.signup); // Définit la route POST '/signup' pour le routeur et appelle la méthode signup du contrôleur d'utilisateur
router.post('/login', userCtrl.login); // Définit la route POST '/login' pour le routeur et appelle la méthode login du contrôleur d'utilisateur

// Exporte le routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;