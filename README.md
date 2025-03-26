# QR Code Generator

Ce projet est une application web développée avec [Next.js](https://nextjs.org) qui permet de générer des QR codes personnalisés. Vous pouvez configurer l'URL, les couleurs, la taille, et le niveau de correction d'erreur du QR code, puis le télécharger au format PNG.

## Fonctionnalités

- Génération de QR codes à partir d'une URL.
- Personnalisation des couleurs (avant-plan et arrière-plan).
- Ajustement de la taille du QR code.
- Sélection du niveau de correction d'erreur (Low, Medium, Quartile, High).
- Téléchargement du QR code généré au format PNG.

## Technologies utilisées

- **Framework** : [Next.js](https://nextjs.org)
- **UI Components** : Radix UI, Tailwind CSS
- **Bibliothèque QR Code** : [qrcode.react](https://github.com/zpao/qrcode.react)
- **Gestion des états** : React Hooks

## Installation

1. Clonez ce dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/qr-code-generator.git
   cd qr-code-generator
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## Lancer le projet

Pour démarrer le serveur de développement, exécutez :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## Structure du projet

- **`app/`** : Contient les pages et les styles globaux.
- **`components/`** : Composants réutilisables pour l'interface utilisateur.
- **`hooks/`** : Hooks personnalisés pour la logique réactive.
- **`lib/`** : Fonctions utilitaires.
- **`public/`** : Fichiers statiques (images, icônes, etc.).

## Déploiement

Le moyen le plus simple de déployer cette application est d'utiliser [Vercel](https://vercel.com). Suivez la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.
