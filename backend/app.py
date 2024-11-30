from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from func import filling_json


app = Flask(__name__)
#CORS(app)
CORS(app, origins=["http://localhost:3000", 'http://127.0.0.1:5000'])
# @app.route('/api/', methods=['GET', 'POST', 'OPTIONS'])
IMAGES = os.path.join('/static', 'images')
DATA = os.path.join('/static', 'data')
app.config['UPLOAD_FOLDER'] = os.path.join(IMAGES, 'input')
app.config['DOWNLOAD_FOLDER'] = os.path.join(IMAGES, 'output')
app.config['POST_DATA_FOLDER'] = os.path.join(DATA, 'input')
app.config['GET_DATA_FOLDER'] = os.path.join(DATA, 'output')

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/api/postdata', methods=['POST', 'OPTIONS'])
def post_data():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Data saved successfully'}), 200
    
    data = request.get_json()
    filling_json(data, app.config['UPLOAD_FOLDER'], app.config['POST_DATA_FOLDER'])

    return jsonify({'message': 'Data saved successfully'}), 200


@app.route('/api/getdata/<UID>', methods=['GET', 'OPTIONS'])
def get_data(UID):
    json_file_path = os.path.join(app.config['GET_DATA_FOLDER'][1:], f'{UID}.json')
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r') as file:
            data = file.read()
            #print(data)
            return data, 200
    else:
        return jsonify({"status": "loading"}), 400


@app.route('/api/getimage/<name>', methods=['GET'])
def get_image(name):
    filename = os.path.join(app.config['DOWNLOAD_FOLDER'], name)
    return f'<img src="{filename}">'



if __name__ == '__main__':
    app.run(debug=True, port='5000')
