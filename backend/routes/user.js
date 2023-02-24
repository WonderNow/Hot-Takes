const express = require('express');
// Crée une instance de routeur Express
const router = express.Router();
// Importe le contrôleur des utilisateurs
const userCtrl = require('../controllers/user');

// Définit la route POST '/signup' pour le routeur et appelle la méthode signup du contrôleur d'utilisateur
router.post('/signup', userCtrl.signup);
// Définit la route POST '/login' pour le routeur et appelle la méthode login du contrôleur d'utilisateur
router.post('/login', userCtrl.login);

// Exporte le routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;