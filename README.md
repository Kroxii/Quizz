# Bienvenue dans le projet Quizz !

Ce projet est une application web développée avec Node.js, conçue pour permettre aux professeurs (partie Admin) de créer, gérer et superviser des quiz.

Ce développement s'inscrit dans le cadre de notre projet Akaton réalisé en équipe durant notre formation. L'objectif : répondre aux besoins d’un client selon un cahier des charges précis.

Avant de te lancer, voici ce que tu dois faire :

## Installation

    Clone le repo

```bash

git clone <https://github.com/Kroxii/Quizz.git>

cd Quizz


```

## Installe les dépendances

On utilise npm install pour installer tout dépendances dont on a besoin :

```bash

    npm install

```

### Dépendances principales:

- **Express** : pour gérer le serveur et les routes
- **Joi** : pour valider les données (validators)
- **Mongoose** : pour interagir avec la base de données MongoDB
- **MongoDB** : base de données NoSQL utilisée pour stocker les quizz et questions
- **Nodemon** : pour recharger automatiquement le serveur pendant le développement

## Lancer le projet

### 1. Configuration de la base de données

Assure-toi d’avoir une instance MongoDB active (en local ou via un service cloud comme MongoDB Atlas). Renseigne l’URL de connexion dans connectDB.js si besoin.

Tu as les fichier en Json pour replir un peu ta db si tu veux a la rasine pour question et quizz

### 2. Démarrer le serveur

Depuis le dossier `Server`, lance :

```bash

node app.js

```

ou , pour le développement

```bash

npx nodemon app.js

```

> Important : vérifie bien que tu es dans le bon dossier (`Server/`) quand tu lances cette commande.

### 3. Lancer le front

Ouvre `Front/index.html` avec Live Server depuis VS Code, ou simplement dans ton navigateur.

---

## Technologies utilisées

- HTML / CSS / JavaScript
- Node.js / Express
- MongoDB / Mongoose (NoSQL)

---

## Fonctionnalités

- Créer une question
- Créer un quizz
- Supprimer une question
- Gérer les données via des routes API REST

---

## Arborescence du projet

```
Quizz/
│
├── Front/
│   ├── index.html
│   ├── script.js
│   └── styles.js
│
├── Server/
│   ├── connectDB/
│   │   └── connectDB.js
│   ├── controllers/
│   │   ├── questionControllers.js
│   │   └── quizzControllers.js
│   ├── models/
│   │   ├── questionSchema.js
│   │   └── quizzSchema.js
│   ├── routes/
│   │   ├── questionRouter.js
│   │   └── quizzRouter.js
│   ├── validator/
│   │   ├── validatorQuestion.js
│   │   └── validatorQuizz.js
│   └── app.js
│
├── questions.json
├── quizz.json
└── README.md
```

---

## Auteurs

Fait avec cœur ❤️ par :  
**Julien**, **Remi**,**Deriick**
**Nina** et son équipe de choc
