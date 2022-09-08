<div align="center">
<img src="https://github.com/brisqapp/admin/blob/main/logo.jpg" width="320px"><br/>
Une manière simple de gérer ses rendez-vous
</div>

<hr/>

# Front-end (REACT)

## Prérequis d'installation

- Avoir node et npm d'installé.

## Installation pour développement en local

1. Cloner le repository courant

```bash
git clone https://github.com/brisqapp/brisq-client
```

2. Installer les packages npm

```bash
npm install
```

3. Lancer le serveur en local

```bash
npm start
```

Après le lancement il faudra attendre environ 5 minutes pour que le serveur REACT soit chargé et utilisable. Ensuite toutes modifications dans le code sera instantanément mis en place sur le serveur local.npm d'installé.

## Développement

### Principales technologies utiliséées

Le front-end est une application single page web. Pour la mettre en place nous avons utilisés les technologies suivantes:

[__React:__](https://fr.reactjs.org/)  
L'application est basée en react.

[__React-router-dom:__](https://v5.reactrouter.com/web/guides/quick-start)  
React router dom permet de mettre en place une application single page en React.

[__Material-ui:__](https://mui.com/material-ui/getting-started/overview/)  
Material ui est une libraire graphique adaptée à React

[__Axios:__](https://axios-http.com/docs/intro)  
Axios permet de faire des requêtes http en toute simplicité

### Organisation des fichiers

**API:**  
Dossier qui contient la communication avec le backend

- Le fichier index.js contient la configuration d'accès au backend

**AUTH:**  
Dossier qui contient la gestion de l'authentification

**COMPONENT:**  
Dossier qui contient les composants React custom

**PAGE:**  
Dossier qui contient toutes les pages

**UTILS:**  
Dossier qui contient des fonctions javascript utiles

**index.js**  
Fichier d'entrée de l'application. Contient les différentes routes (mise en place avec react-router-dom)
