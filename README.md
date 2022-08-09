# TP07_Creez_un_reseau_social_d-entreprise


## Installation :

- Installation de node JS : 

    - Rendez vous sur le site de nodeJs (https://nodejs.org) et téléchargez la dernière version stable
    - Pour vérifier que nodeJS est bien installé, tapez la commande suivante dans un terminal : ```node -v```
    - Vérifiez que la version retournée est bien supérieure ou égale a la version ```v16.16.0``` 
- Ouvrez le dossier ```script``` puis modifiez le fichier ```back.bat``` pour remplacez les  valeurs des variables d'environements par les vôtres, 

    - Voici un exemple :
        - set PORT=5000 (port ou sera lancé le serveur backend)
        - set IDMDB=username:password (identifiant et mot de passe de connexion a mongoDB)
        - set TOKEN_SECRET=e4er3h5r435rh43r5h4rfefe145154UuybndfiuUiodrebg35h4re (random string)

- Ouvrez le fichier ```init-server.bat``` qui se trouve a la racine du projet  pour installer les dépendances nécessaires.

## Démarrage des serveurs :

- Pour démarrer les serveurs, ouvrez le fichier ```start-server.bat```

    - Rendez-vous sur l'adresse retournée par le terminal backend (http://localhost:PORT)
    
    - Si la Connexion a échouée et que le port retourne :  ```undefined```, vérifiez bien les variables d'environnements retournées par le terminal du serveur backend et verifiez qu'elles sont correctes
        - Exemple : 
            - ![alt text](https://i.postimg.cc/g0F3Q0rB/Screenshot-1.png)



    - :information_source: Au lancement des serveurs, le script va vérifier que toutes les dépendances sont a jours, si vous voulez passer cette étape, supprimez la ligne ```npm update``` dans les fichiers ```back.bat``` et ```front.bat```
