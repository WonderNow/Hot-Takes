const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://tom:tom123@cluster0.ggs1w0m.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/api/auth', userRoutes);

module.exports = app;