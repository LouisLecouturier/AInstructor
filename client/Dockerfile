# Utilisation d'une image de base avec Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans l'image
WORKDIR /app

# Copier le package.json et le package-lock.json (ou yarn.lock) dans l'image
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install --force

# Copier le reste des fichiers de l'application dans l'image
COPY . .

# Exposer le port sur lequel l'application Next.js écoute
EXPOSE 3000

# Lancer la commande de build pour l'application
RUN npm run build

# Lancer l'application Next.js lorsque le conteneur démarre
CMD ["npm", "start"]
