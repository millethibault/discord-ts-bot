# Discord Bot en TypeScript

Pour reconstruire le projet :
```bash
npm run build
```

Pour lancer le projet :

```bash
npm run start
```

-----------------------

Pour faire des requêtes à la base de donnée (pour créer une table par exemple) :
```bash
mysql -u root -p <DATABASE_NAME> 
```
Entrer le mot de passe
```bash
<logique SQL>
exit
```

-----------------------

Connexion au serveur :

```bash
ssh root@IP_DU_VPS
``` 

```bash
dockercompose down --remove-orphans
dockercompose up -d
dockercompose logs -f
dockercompose up --build --force-recreate
```
