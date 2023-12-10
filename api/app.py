from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    # Call the function to interact with ChatGPT API
    bot_response = get_chatgpt_response(user_message)

    return jsonify({'botResponse': bot_response})

def get_chatgpt_response(user_message):
    api_url = 'https://api.openai.com/v1/chat/completions'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer API_KEY',  # Replace with your actual API key
    }
    payload = {
        'messages': [
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': user_message},
        ],
    }

    response = requests.post(api_url, json=payload, headers=headers)
    bot_response = response.json()['choices'][0]['message']['content']
    return bot_response

if __name__ == '__main__':
    app.run(debug=True)
