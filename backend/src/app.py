from flask import Flask, send_from_directory
import config
from flask_cors import CORS
app = Flask(__name__, static_url_path='', static_folder='../static')

if config.DEV:
    CORS(app)


# Frontend and static files


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def index(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/manifest.json')
def manifest():
    return send_from_directory(app.static_folder, 'manifest.json')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'favicon.ico')


@app.route('/logo192.png')
def logo192():
    return send_from_directory(app.static_folder, 'logo192.png')


@app.route('/logo512.png')
def logo512():
    return send_from_directory(app.static_folder, 'logo512.png')


# API routes


@app.route('/api/ping')
def ping():
    return 'pong'


if __name__ == '__main__':
    app.run()
