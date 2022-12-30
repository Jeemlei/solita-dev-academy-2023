import os
from dotenv import load_dotenv

load_dotenv()

DEV = os.getenv('FLASK_DEBUG')