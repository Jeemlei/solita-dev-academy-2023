from db import db
from services.tools import format_station_result


def get_stations():
    result = db.session.execute('SELECT * FROM stations ORDER BY id').fetchall()
    return list(map(lambda station: format_station_result(station), result))


def get_station_by_id(id):
    result = db.session.execute(
        f'SELECT * FROM stations WHERE id={id}').fetchone()
    if not result:
        return 'Station not found', 404
    return format_station_result(result)
