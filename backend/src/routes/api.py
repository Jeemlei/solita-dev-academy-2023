from app import app
from services import stations_service


# API routes --------------------------------------v
@app.route('/api/ping', methods=['GET'])
def ping():
    return 'pong'


@app.route('/api/stations/<id>', methods=['GET'])
def station(id):
    result = stations_service.get_stations()
    return result
