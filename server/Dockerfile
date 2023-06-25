# Utilisation d'une image de base avec Python 3.11
FROM python:3.11-slim

# Définir le répertoire de travail dans l'image
WORKDIR /app

# Installer Pandoc
RUN apt-get update && apt-get install -y pandoc

# Copier le Pipfile et le Pipfile.lock dans l'image
COPY Pipfile* ./

# Installer les dépendances du projet à l'aide de pipenv
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile

# Copier le reste des fichiers de l'application dans l'image
COPY . .

# Exposer le port sur lequel l'application Django écoute (par défaut : 8000)
EXPOSE 8000

# Exécuter les migrations avant le démarrage de l'application
RUN cd AInstructor && python manage.py makemigrations app
RUN cd AInstructor && python manage.py migrate

# Lancer l'application Django lorsque le conteneur démarre
CMD ["python", "AInstructor/manage.py", "runserver", "0.0.0.0:8000"]
