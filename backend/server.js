const http = require('http'); // Package permettant de créer un serveur HTTP
const app = require('./app'); // Importe l'application Express
const fs = require('fs'); // File System, package de Node.js permettant de gérer les fichiers
const path = require('path'); // Package de Node.js permettant de gérer les chemins de fichiers et de répertoires

// Définition d'un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000'); // Si le port n'est pas défini, on utilise le port 3000
app.set('port', port);

// Recherche des différentes erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du serveur
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Ecoute du serveur sur le port 3000
server.listen(port);

// Vérifie si le dossier "images" existe déjà
const imagesDirectory = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDirectory)) {
  // Crée le dossier "images"
  fs.mkdirSync(imagesDirectory);
  console.log('Le dossier "images" a été créé avec succès !');
}