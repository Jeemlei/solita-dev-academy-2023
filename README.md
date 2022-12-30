# Backend
Run all the commands in the `backend`-directory.
## Installation
Requires Python version 3.8+ and pip.

Create and activate a virtual environment and install depedencies:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r ./requirements.txt
```

### Development mode
Provide following environment variables in `.env`-file:
```
FLASK_APP=src/app.py
FLASK_DEBUG=true
```
Start backend with:
```bash
flask run
```

### Production mode
[First build production build of the frontend.](../frontend/README.md)

Provide following environment variables in `.env`-file:
```
FLASK_APP=src/app.py
```
Start backend with:
```bash
flask run
```