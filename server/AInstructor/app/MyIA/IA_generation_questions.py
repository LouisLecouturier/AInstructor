import os
import sys
import django
import openai



# Chemin vers le répertoire contenant les dossiers de cours
chemin_repertoire_cours = "C:/Users/jules/OneDrive/Bureau/AInstructorV1/AInstructor/server/AInstructor/cours"

# Obtenez la liste des dossiers triés par date de modification (du plus récent au plus ancien)
dossiers = sorted(os.listdir(chemin_repertoire_cours), key=lambda x: os.path.getmtime(os.path.join(chemin_repertoire_cours, x)), reverse=True)

# Sélectionnez le dernier dossier (le plus récent)
dernier_dossier = dossiers[0]  # Si la liste n'est pas vide

# Chemin complet vers le dernier dossier de cours
chemin_dernier_dossier = os.path.join(chemin_repertoire_cours, dernier_dossier)

# Vérifiez si le dossier existe
if os.path.isdir(chemin_dernier_dossier):
    # Obtenez la liste des fichiers dans le dernier dossier
    fichiers = os.listdir(chemin_dernier_dossier)

    # Vérifiez si des fichiers existent dans le dossier
    if fichiers:
        # Sélectionnez le dernier fichier modifié dans le dossier
        dernier_fichier = max(fichiers, key=lambda f: os.path.getmtime(os.path.join(chemin_dernier_dossier, f)))

        # Chemin complet vers le dernier fichier
        chemin_dernier_fichier = os.path.join(chemin_dernier_dossier, dernier_fichier)

        # Ouvrez le fichier en mode lecture
        with open(chemin_dernier_fichier, "r", encoding="utf-8") as fichier:
            # Lisez le contenu du fichier
            texte = fichier.read()

            # Utilisez le contenu du fichier comme vous le souhaitez
            #print(texte)
    else:
        print("Aucun fichier trouvé dans le dernier dossier de cours.")
else:
    print("Le dernier dossier de cours n'existe pas.")



##############################################################

openai.api_key = "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"

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "assistant", "content": texte},
        {"role": "user", "content": "Ecrit moi 10 questions sur ce texte pour tester mes connaisances mais tu ecris seulement les questions et pas les réponses"},
    ]
)

##############################################################
chemin_fichier_data = "C:/Users/jules/OneDrive/Bureau/AInstructorV1/AInstructor/server/AInstructor/app/MyIA/data.txt"

# Ouvrez le fichier en mode écriture
with open(chemin_fichier_data, "w", encoding="utf-8") as fichier:
    # Écrivez le contenu dans le fichier
    fichier.write(response.choices[0].message.content)
##############################################################

print("done")
