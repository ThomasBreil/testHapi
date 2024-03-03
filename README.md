#README - Application de Gestion de Films

#Introduction
Bienvenue dans notre application de gestion de films ! Cette application a été conçue pour offrir une expérience complète de découverte de films, de gestion de contenu et de communication avec les utilisateurs. Ce README fournit des instructions sur la configuration, l'installation et l'utilisation de l'application, ainsi qu'un aperçu des fonctionnalités principales.

#Configuration de l'Environnement

1. **Variables d'Environnement**:
   - Assurez-vous de définir les variables d'environnement suivantes pour configurer correctement l'application :
     - `SMTP_HOST`: L'hôte du serveur de messagerie pour l'envoi d'email.
     - `SMTP_PORT`: Le port du serveur de messagerie.
     - `SMTP_USER`: L'utilisateur du serveur de messagerie.
     - `SMTP_PASS`: Le mot de passe de l'utilisateur du serveur de messagerie.
     
2. **Base de Données**:
   - Configurez votre base de données en fonction des paramètres définis dans le fichier `server/manifest.js`.

#Installation

1. Clonez le dépôt depuis GitHub :
   ```
   git clone https://github.com/votre-utilisateur/nom-du-repo.git](https://github.com/ThomasBreil/testHapi.git
   ```

2. Installez les dépendances npm :
   ```
   npm install
   ```

3.Installez les conteneurs docker : 
  Après avoir démarrer Docker :
  ```
  docker run --name hapi-mysql -e MYSQL_USER=temmie -e MYSQL_PASSWORD=hapi -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password
  ```

  ```
  docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:3.13-management
  ```

#Utilisation

1. Démarrez l'application en mode développement :
   ```
   npm run dev
   ```

2. Accédez à l'application dans votre navigateur à l'adresse `http://localhost:3000`.

3. Vous pouvez utilisez les fonctionnalités à l'adresse 'http://localhost:3000'.

#Fonctionnalités Principales

1. **Service d'Envoi d'Emails**:
   - L'application utilise nodemailer pour envoyer des emails. Assurez-vous de configurer correctement les variables d'environnement pour activer cette fonctionnalité.

2. **Bibliothèque de Films**:
   - Les utilisateurs peuvent découvrir, ajouter à leurs favoris, modifier et supprimer des films.
   - Les films contiennent des informations telles que le titre, la description, la date de sortie et le réalisateur.
   - Les utilisateurs non administrateurs peuvent uniquement gérer leur liste de films favoris.

3. **Notifications par Email**:
   - Des emails sont envoyés pour accueillir les nouveaux utilisateurs et informer les utilisateurs des mises à jour concernant les films qu'ils ont dans leurs favoris.

4. **Intégration d'un Message Broker**:
   - Les administrateurs peuvent demander un export CSV de tous les films dans la base de données.
   - Le fichier CSV est envoyé en pièce jointe par email à l'administrateur ayant effectué la demande.

#Contribution
Les contributions sont les bienvenues ! Si vous souhaitez contribuer à l'amélioration de l'application, veuillez soumettre une demande de tirage (pull request) et nous serons ravis de l'examiner.

#Problèmes
Si vous rencontrez des problèmes ou si vous avez des questions, veuillez ouvrir un ticket (issue) dans la section des problèmes (issues) de ce dépôt GitHub. Nous ferons de notre mieux pour vous aider.

#Remerciements
Un grand merci à tous ceux qui ont contribué à ce projet et à ceux qui l'utilisent. Votre soutien est grandement apprécié !

---
Ce README fournit un aperçu de base de l'application et des instructions sur son utilisation. Pour plus de détails sur l'implémentation et les fonctionnalités spécifiques, veuillez consulter la documentation dans le code source de l'application.
