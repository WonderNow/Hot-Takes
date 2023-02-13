const express = require('express');
const router = express.Router();

const auth = require('auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/stuff');

router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createThing);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;