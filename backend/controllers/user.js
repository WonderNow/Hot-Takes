const bcrypt = require('bcrypt'); // Package permettant le hashage des mots de passe
const jwt = require('jsonwebtoken'); // Package permettant la création de tokens d'authentification
const User = require('../models/User'); // Importation du modèle d'utilisateur

// Création des utilisateurs dans la base de donnée
exports.signup = (req, res, next) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; // Regex pour vérifier la validité du mot de passe
    if (!passwordRegex.test(req.body.password)) { // Si le mot de passe ne correspond pas à la regex
        console.log("Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre en majuscule, une lettre en minuscule et un chiffre."); // Affiche un message d'erreur dans la console
        return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre en majuscule, une lettre en minuscule et un chiffre." }); // Retourne une erreur 400
    }

    bcrypt.hash(req.body.password, 10) // Hashage du mot de passe grâce à bcrypt
    .then(hash => { // Si le hashage est réussi
        const user = new User({ // Création d'un nouvel utilisateur
            email: req.body.email,
            password: hash
        });
        user.save() // Enregistrement de l'utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // Si l'enregistrement est réussi, retourne un statut 201 et un message de validation
        .catch(error => res.status(400).json({ error })); // Si l'enregistrement échoue, retourne un statut 400 et un message d'erreur
    })
    .catch(error => res.status(500).json({ error })); // Si le hashage échoue, retourne un statut 500 et un message d'erreur
};

// Vérification de la validité des identifiants fournis par l'utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Recherche dans la base de données un utilisateur ayant l'adresse email fournie
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // Si l'utilisateur n'est pas trouvé, retourne un statut 401 et un message d'erreur
            }
            bcrypt.compare(req.body.password, user.password) // Compare le mot de passe fourni avec le hash enregistré dans la base de données
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' }); // Si la comparaison échoue, retourne un statut 401 et un message d'erreur
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    }); // Si la comparaison est réussie, retourne un statut 200 et un token d'authentification
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); // Si la recherche échoue, retourne un statut 500 et un message d'erreur
};