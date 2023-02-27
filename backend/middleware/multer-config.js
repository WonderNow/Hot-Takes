const multer = require('multer'); // Package permettant de gérer les fichiers entrants dans les requêtes HTTP

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Logique indiquant à multer où enregistrer les fichiers entrants et comment les nommer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Filtre de fichiers
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    callback(null, true); // Accepter le fichier
  } else {
    callback(new Error(`Le format de l'image est invalide, seuls les fichiers JPEG, JPG et PNG sont autorisés !`), false); // Refuser le fichier
  }
};

// Exportation de multer en précisant que seuls les fichiers image seront gérés
module.exports = multer({ storage: storage, fileFilter: fileFilter }).single('image');