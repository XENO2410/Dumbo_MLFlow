# mlflow_service/app.py

import os
import mlflow
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuration ---
# 1. Connect to your local MLflow server (which should be running at port 5000)
mlflow.set_tracking_uri("http://127.0.0.1:5000")
mlflow.set_experiment("CodeGPT Chat Traces")

# 2. THIS IS THE KEY: Enable automatic logging for OpenAI-compatible calls
mlflow.autolog(log_models=False, silent=True)

# 3. Configure the CodeGPT client using an environment variable for the API key
# Make sure to set this key in your terminal before running!
client = OpenAI(
    api_key=os.environ.get("CODEGPT_API_KEY"),
    base_url="https://api.codegpt.co/api/v1" # The base URL for the CodeGPT API
)

# --- Flask API ---
app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/invoke-codegpt', methods=['POST'])
def invoke_handler():
    """
    Receives data from your Node.js backend, calls CodeGPT,
    and returns the response. MLflow automatically logs this interaction.
    """
    data = request.json
    agent_id = data.get("agentId")
    messages = data.get("messages")

    if not all([agent_id, messages]):
        return jsonify({"error": "agentId and messages are required"}), 400

    # MLflow's autolog will automatically start a run and trace the 'client.chat.completions.create' call.
    try:
        completion = client.chat.completions.create(
            model=agent_id, # The agentId is used as the 'model' parameter
            messages=messages,
            stream=False # Set stream to False to get a single, complete response
        )
        response_text = completion.choices[0].message.content
        return jsonify({"response": response_text})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

# The OLD line at the bottom of app.py
# The NEW line at the bottom of app.py
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)