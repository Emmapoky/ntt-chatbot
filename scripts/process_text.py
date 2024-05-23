#!/usr/bin/env python3
import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Load text content
with open("nttdata_text.txt", "r") as file:
    text = file.read()

# Process the text
doc = nlp(text)

# Extract keywords and phrases
keywords = [chunk.text for chunk in doc.noun_chunks if len(chunk.text.split()) > 1]

# Save keywords to a file
with open("nttdata_keywords.txt", "w") as file:
    file.write("\n".join(keywords))

