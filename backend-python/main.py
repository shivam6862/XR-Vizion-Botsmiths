from flask import Flask, jsonify, request
from flask_cors import CORS
from model import *
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
        # data = request.form.get('question')
        # conversationId = request.form.get('conversationId')
        # history = request.form.get('messageHistory')
        data = request.json.get('question')
        conversationId = request.json.get('conversationId')
        history = request.json.get('messageHistory')
        print(data , conversationId , history)
        # data = "what is ER model ?"
        # conversationId = "fdbfuidi-bfkhbdekjb-efjkbefjkb"
        # history = None

        if not data:
            return jsonify({"error": "Missing data or file"}), 400
        
        answer, history , time_taken, query_cost = models.model(data=data  ,conversationId=conversationId, history=history)
        
        response_obj = [{
                "text": answer,
                "timeTaken": time_taken,
                "queryCost": query_cost,
                "messageHistory": history,
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
