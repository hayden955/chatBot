from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv


load_dotenv()

api_key = os.environ.get('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    # Call the function to interact with ChatGPT API
    bot_response = get_chatgpt_response(user_message)

    return jsonify({'botResponse': bot_response})

convo_history = []

def get_chatgpt_response(user_message):
    global convo_history
    
    convo_history.append({'role': 'user', 'content': user_message})

    payload = {
            'messages': convo_history,
            "model": "gpt-3.5-turbo-0613",
        }
    
    api_url = 'https://api.openai.com/v1/chat/completions'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}',
    }

    response = requests.post(api_url, json=payload, headers=headers)
    
    if response.ok:
        bot_response = response.json()['choices'][0]['message']['content']
        convo_history.append({'role': 'assistant', 'content': bot_response})
        return bot_response
    else:
        print("API Request Failed:", response.text)

if __name__ == '__main__':
    app.run(debug=True)
