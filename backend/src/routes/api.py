from app import app
from services import stations_service


@app.route('/api/ping', methods=['GET'])
def ping():
    return 'pong'


@app.route('/api/stations', methods=['GET'])
def stations():
    result = stations_service.get_stations()
    return result


@app.route('/api/stations/<id>', methods=['GET'])
def station(id):
    result = stations_service.get_station_by_id(id)
    return result
