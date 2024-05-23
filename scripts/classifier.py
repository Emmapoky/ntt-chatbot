#!/usr/bin/env python3
from transformers import pipeline

# Load a pre-trained model
classifier = pipeline('zero-shot-classification', model='facebook/bart-large-mnli')

# Define candidate labels
candidate_labels = ["NTT Data", "technology", "business", "consulting", "data", "solutions"]

def classify_prompt(prompt):
    result = classifier(prompt, candidate_labels)
    if result['labels'][0] == "NTT Data" and result['scores'][0] > 0.8:
        return "NTT Data related"
    else:
        return "Not NTT Data related"

