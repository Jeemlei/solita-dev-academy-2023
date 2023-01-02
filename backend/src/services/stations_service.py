from db import db


def get_stations():
    result = db.session.execute(f'SELECT * FROM stations')
    return list(map(lambda station: {
        'id': station[0], 'name': station[1], 'latlng': station[2]}, result.fetchall()))
