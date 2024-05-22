from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import numpy as np
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = SentenceTransformer('all-MiniLM-L6-v2')

# Example content from the website
website_content = [
    "NTT Data is a global IT service provider",
    "We offer a range of services including consulting, application services, and business process outsourcing",
    "Our mission is to provide high-quality services to our clients"
]

# Generate embeddings for the website content
website_embeddings = model.encode(website_content, convert_to_tensor=True)

@app.route('/check_prompt', methods=['POST'])
def check_prompt():
    prompt = request.json.get('prompt')
    prompt_embedding = model.encode(prompt, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(prompt_embedding, website_embeddings)
    max_similarity = np.max(similarities).item()
    
    if max_similarity > 0.7:
        response = get_gemini_response(prompt)
        return jsonify({'response': response})
    else:
        return jsonify({'response': "Sorry, I can only answer questions related to the NTT Data website."})

def get_gemini_response(prompt):
    # Make an API call to the Gemini API with the prompt
    # Replace <GEMINI_API_URL> and <API_KEY> with the actual URL and API key
    url = 'https://gemini-api-url.com'
    headers = {
        'Authorization': 'Bearer <API_KEY>',
        'Content-Type': 'application/json'
    }
    data = {'prompt': prompt}
    response = requests.post(url, headers=headers, json=data)
    return response.json().get('text', 'Sorry, an error occurred while fetching the response.')

if __name__ == '__main__':
    app.run(debug=True)
