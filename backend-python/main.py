from flask import Flask, jsonify, request
from flask_cors import CORS
from model import *
import os
app = Flask(__name__, static_url_path='/uploads', static_folder='uploads')
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/', methods=['GET'])
def home():
    response_obj = [{
        "message": "successfully run the server."
    }]
    response_headers = {
        "Access-Control-Allow-Origin": "*"
    }
    return jsonify(response_obj), 200, response_headers


@app.route('/uploadDocument', methods=['POST'])
def uploadDocument():
    try:
        question = request.form.get('question')
        messageHistory = request.form.get('messageHistory')
        conversationId = request.form.get('conversationId')

        uploaded_file = request.files.get('file')
        uploaded_audio = request.files.get('audio')

        if uploaded_file:
            filename = os.path.join(
                app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            uploaded_file.save(filename)
        if uploaded_audio:
            filename = os.path.join(
                app.config['UPLOAD_FOLDER'], uploaded_audio.filename)
            uploaded_audio.save(filename)

        if not question:
            return jsonify({"error": "Missing data or file"}), 400
        answer, history, time_taken, query_cost = models.model(
            data=question, conversationId=conversationId, history=messageHistory)

        response_obj = [{
            "text": answer,
            "timeTaken": time_taken,
            "queryCost": query_cost,
            "messageHistory": history.chat_summary,
            "title": history.title,
            "message": "Predictions saved successfully."
        }]

        response_headers = {
            "Access-Control-Allow-Origin": "*"
        }
        return jsonify(response_obj), 200, response_headers
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


if __name__ == "__main__":
    models = Models()
    app.run(host="localhost", port=8501)

# .\env\Scripts\activate
