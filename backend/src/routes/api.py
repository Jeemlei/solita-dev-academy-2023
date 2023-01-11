from app import app
from services import stations_service
from flask import request
from services.journeys_service import import_journey_csv, get_journeys, get_last_page
from services.geocoding_service import get_address


@app.route('/api/ping', methods=['GET'])
def ping():
    return 'pong'


@app.route('/api/stations', methods=['GET'])
def stations():
    return stations_service.get_stations()


@app.route('/api/stations/<id>', methods=['GET'])
def station(id):
    return stations_service.get_station_by_id(id)


@app.route('/api/journeys', methods=['GET', 'POST'])
def journeys():
    if request.method == 'GET':
        params = request.args.to_dict()
        return get_journeys(params.get('page'),
                            params.get('page_size'),
                            params.get('order_by'))

    if request.method == 'POST':
        file = request.files.getlist('file')[0]
        import_journey_csv(file)
        return f'{file.filename} succesfully imported', 201


@app.route('/api/geocode/address', methods=['GET'])
def address():
    params = request.args.to_dict()
    return get_address(params.get('lat'), params.get('lng'))


@app.route('/api/journeys/last_page', methods=['GET'])
def last_page():
    params = request.args.to_dict()
    return {'last_page': get_last_page(params.get('page_size'))}
