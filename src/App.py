from flask import Flask, request, jsonify
from classifier import classify_prompt

app = Flask(__name__)

@app.route('/check_prompt', methods=['POST'])
def check_prompt():
    data = request.json
    prompt = data.get('prompt')
    result = classify_prompt(prompt)
    is_related = result == "NTT Data related"
    return jsonify({'response': result, 'is_related': is_related})

if __name__ == '__main__':
    app.run(debug=True)
