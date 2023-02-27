const express = require('express'); // Package permettant de créer un serveur Express et de gérer les requêtes et les réponses HTTP
const router = express.Router();

const auth = require('../middleware/auth'); // Importation du middleware d'authentification
const multer = require('../middleware/multer-config'); // Importation du middleware de gestion des fichiers entrants

const sauceCtrl = require('../controllers/sauce'); // Importation du contrôleur des sauces

// Définition des routes pour les différentes requêtes HTTP
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce); 
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router; // Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application