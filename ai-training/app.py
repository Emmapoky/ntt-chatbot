from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/train', methods=['POST'])
def train_model():
    try:
        result = subprocess.run(['python', 'ai-training/train_model.py'], capture_output=True, text=True)
        return jsonify({'output': result.stdout, 'error': result.stderr})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)