const Sauce = require('../models/Sauce');
const fs = require('fs');
const path = require('path');

// Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error: error.name, description: error.message, message: 'Erreur lors de la récupération des sauces' }));
};

// Vérifie si le dossier "images" existe déjà
const imagesDirectory = path.join(__dirname, '../images');
if (!fs.existsSync(imagesDirectory)) {
  // Crée le dossier "images"
  fs.mkdirSync(imagesDirectory);
  console.log('Le dossier "images" a été créé avec succès !');
}

// Création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch(error => { res.status(400).json( { error: error.name, description: error.message, message: `Erreur lors de l'enregistrement de la sauce` })})
};

// Récupération d'une sauce spécifique
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error: error.name, description: error.message, message: 'Erreur lors de la récupération des données de la sauce' }));
};

// Modification d'une sauce spécifique
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Sauce modifiée !'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Suppression d'une sauce spécifique
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Non autorisé'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

// Like ou dislike d'une sauce spécifique
exports.likeSauce = (req, res, next) => {

    Sauce.findOne({_id : req.params.id})
    .then(sauce => {
        // Si l'utilisateur n'a pas encore liké ou disliké la sauce
        if (sauce.usersLiked.indexOf(req.auth.userId) === -1 && sauce.usersDisliked.indexOf(req.auth.userId) === -1) {
            // Si l'utilisateur like la sauce
            if (req.body.like === 1) {
                Sauce.updateOne({_id : req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.auth.userId}})
                .then(() => res.status(200).json({message: 'Like ajouté !'}))
                .catch(error => res.status(400).json({ error }));
            }
            // Si l'utilisateur dislike la sauce
            if (req.body.like === -1) {
                Sauce.updateOne({_id : req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.auth.userId}})
                .then(() => res.status(200).json({message: 'Dislike ajouté !'}))
                .catch(error => res.status(400).json({ error }));
            }
        }
        // Si l'utilisateur a déjà liké la sauce
        if (sauce.usersLiked.indexOf(req.auth.userId) !== -1) {
            // Si l'utilisateur annule son like
            if (req.body.like === 0) {
                Sauce.updateOne({_id : req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.auth.userId}})
                .then(() => res.status(200).json({message: 'Like retiré !'}))
                .catch(error => res.status(400).json({ error }));
            }
        }
        // Si l'utilisateur a déjà disliké la sauce
        if (sauce.usersDisliked.indexOf(req.auth.userId) !== -1) {
            // Si l'utilisateur annule son dislike
            if (req.body.like === 0) {
                Sauce.updateOne({_id : req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.auth.userId}})
                .then(() => res.status(200).json({message: 'Dislike retiré !'}))
                .catch(error => res.status(400).json({ error }));
            }
        }
    })
    .catch(error => res.status(404).json({ error: error.name, description: error.message, message: 'Erreur lors de la récupération des données de la sauce.' }));
};