
import os
import openai

# Chemin du fichier texte contenant le contenu
chemin_fichier_texte = "C:/Users/jules/OneDrive/Bureau/IAstructor/texte.txt"

# Ouvrez le fichier texte en mode lecture et lisez son contenu
with open(chemin_fichier_texte, "r", encoding="utf-8") as fichier:
    texte = fichier.read()

# Chemin du fichier contenant les questions
chemin_fichier_questions = "C:/Users/jules/OneDrive/Bureau/IAstructor/data.txt"

# Ouvrez le fichier des questions en mode lecture et lisez son contenu
with open(chemin_fichier_questions, "r", encoding="utf-8") as fichier:
    questions = fichier.read()

# Chemin du fichier contenant les réponses de l'élève
chemin_fichier_reponses = "C:/Users/jules/OneDrive/Bureau/IAstructor/reponses.txt"

# Ouvrez le fichier des réponses en mode lecture et lisez son contenu
with open(chemin_fichier_reponses, "r", encoding="utf-8") as fichier:
    reponses = fichier.read()

# Définissez votre clé API OpenAI
openai.api_key = "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"

# Utilisez OpenAI ChatCompletion pour obtenir une réponse corrigée pour chaque question-réponse
corrections = []
for question, reponse in zip(questions.splitlines(), reponses.splitlines()):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant. You have the text: " + texte + ". You have a question: " + question + ". You have an answer: " + reponse + "."},
            {"role": "user", "content": "Est-ce que la réponse est correcte ?"},
        ]
    )
    correction = response.choices[0].message.content
    corrections.append(correction)

# Affichez les corrections
for correction in corrections:
    print(correction)
