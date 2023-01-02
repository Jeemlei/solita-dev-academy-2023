from app import app
from flask import send_from_directory


# Frontend & static files -------------------------v
@app.route('/', defaults={'path': ''})
@app.route('/<path>', methods=['GET'])
def index(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/manifest.json', methods=['GET'])
def manifest():
    return send_from_directory(app.static_folder, 'manifest.json')


@app.route('/favicon.ico', methods=['GET'])
def favicon():
    return send_from_directory(app.static_folder, 'favicon.ico')


@app.route('/logo192.png', methods=['GET'])
def logo192():
    return send_from_directory(app.static_folder, 'logo192.png')


@app.route('/logo512.png', methods=['GET'])
def logo512():
    return send_from_directory(app.static_folder, 'logo512.png')
