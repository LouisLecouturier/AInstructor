import pdfplumber

def extract_text_from_pdf(filename):
    with pdfplumber.open(filename) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    return text

def write_to_markdown(text, output_filename):
    with open(output_filename, 'w', encoding='utf-8') as file:
        file.write(text)

# Exemple d'utilisation il faut changer et mettre par rapport à une bdd
pdf_filename = "C:/Users/jules/OneDrive/Bureau/AInstructor-Front-End-Antoine/server/AInstructor/Mesdocs/276583.pdf"
markdown_filename = "C:/Users/jules/OneDrive/Bureau/AInstructor-Front-End-Antoine/server/AInstructor/app/MyIA/Markdown.md"

text = extract_text_from_pdf(pdf_filename)
write_to_markdown(text, markdown_filename)

print("Extraction du texte terminée. Le fichier Markdown a été créé :", markdown_filename)
