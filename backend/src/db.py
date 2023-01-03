from app import app
from config import DB_URI
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
db = SQLAlchemy(app)
db_engine = create_engine(DB_URI)
