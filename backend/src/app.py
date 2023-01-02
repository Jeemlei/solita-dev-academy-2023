from flask import Flask, send_from_directory
import config
from flask_cors import CORS
app = Flask(__name__, static_url_path='', static_folder='../static')

if config.DEV:
    CORS(app)

import routes
