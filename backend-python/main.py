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
        data = request.form.get('data')

        if not data:
            return jsonify({"error": "Missing data or file"}), 400

        predictions = models.model(data=data)

        response_obj = [{
            "predictions": predictions,
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
