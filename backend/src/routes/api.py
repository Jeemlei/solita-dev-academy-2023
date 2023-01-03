from app import app
from services import stations_service
from flask import request
from services.journeys_service import import_journey_csv


@app.route('/api/ping', methods=['GET'])
def ping():
    return 'pong'


@app.route('/api/stations', methods=['GET'])
def stations():
    return stations_service.get_stations()


@app.route('/api/stations/<id>', methods=['GET'])
def station(id):
    return stations_service.get_station_by_id(id)


@app.route('/api/journeys', methods=['POST'])
def journeys():
    file = request.files.getlist('file')[0]
    import_journey_csv(file)
    return f'{file.filename} succesfully imported', 201
