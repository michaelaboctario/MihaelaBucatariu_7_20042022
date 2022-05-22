# MihaelaBucatariu_7_20042022, Projet 7, Développeur Web Openclassrooms 

## Groupomania
## Créez un réseau social d’entreprise

## 1- Prérequis

```
Pour installer ce projet, vous devez d'abord installer sur votre ordinateur
  Node.js
  MySQL

Technologies utilisées:

backend: 
    Nodejs, expressjs, MySql, sequelize, bcrypt, jsonwebtoken, multer, password-validator, etc

frontend: 
    Vuejs 3.2, Vuex 4.0, vee-validate, vue-router, axios, vue-fontawesome, yup

Le projet frontend a été généré avec Vue-cli
```

## 2- Cloner le repo du projet

```    
    git clone ...
```
## 3- La base de données
```
1. Ouvrir la console MySQL et créer un compte (ou utiliser MySQL Workbench), 
   Se connecter à votre compte MySQL si vous en avez déjà un

2- Créer une base de données nommée "groupomania"
```

## 4- Installation du Backend
```
1. Dans le terminal, se placer dans le dossier /backend/

2. Installer les packages npm en exécutant la commande  
 
    npm install

3. Renommer le fichier .env-template en .env et ajouter le paramètre RANDOM_SECRET_TOKEN 

4. Il faut créer un dossier vide "images", à la racine du backend

    mkdir images

5. Utiliser le fichier template db.config-template.js pour configurer la connexion à la base de données MySql
   Renommer le fichier en db.config.js en remplir dans USER et PASSWORD les informations de connexion MySql

    USER: ""
    PASSWORD: ""

6.  Les utilisateurs dans la base de données peuvent avoir trois rôles (“role”), prédéfinis : administrateur (“admin”), un 
modérateur (“moderator”), et utilisateur normal.  

L'application nécessite l'existence préalable à deux comptes utilisateurs dans la base de données : un compte "admin" et un compte "moderator". Pour la première version de l'application, ces deux comptes sont créés automatiquement au premier lancement de l'application. Ces deux comptes spéciaux ne pourront pas être supprimes, seulement les comptes utilisateurs normaux pourront être supprimés. Un premier compte "utilisateur" sera également crée dans le script d'initialisation de la base.  

Les informations d'initialisation de la base seront paramètres dans le fichier user.config.js  

Renommer le fichier user.config-template.js en user.config.js et paramétrer ces trois comptes 

Pour l'initialisation de la base de données avec les rôles par default et les utilisateurs par default, il faut lancer la commande 

    node initdb.js

Vous pouvez ensuite insérer des données par défaut, dans les tables "Posts" et "Comments", données qui seront utilisées pour faire un premier test avec l'application. Les données sont paramètres dans le fichier 

    post.config.js

Renommer le fichier post.config-template.js en post.config.js et remplir des informations par défaut pour créer des premiers messages et commentaires. Il faut ensuite exécuter le script

    node initpostsdb.js
    

7. Lancer le serveur Node avec la commande  

    node server.js
```
## 5- Instalation du Frontend
```
1. Dans le terminal, se placer dans le dossier /Frontend/

2. Installer npm en exécutant la commande

    npm install 
 
 3. Lancer le Frontend avec la commande 
 
    npm run serve

```

## 6- Lancer l'application

```
Ouvrir l'application en cliquant sur "http://localhost:8080/"
```