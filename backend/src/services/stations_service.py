from db import db
from services.tools import format_station_result


def get_stations():
    result = db.session.execute(
        'SELECT * FROM stations ORDER BY id').fetchall()
    return list(map(lambda station: format_station_result(station), result))


def get_station_by_id(id):
    result = db.session.execute(
        f'SELECT *, \
                 (SELECT COUNT(*) \
                  FROM journeys \
                  WHERE departure_station={id}) as starting_journeys, \
                 (SELECT COUNT(*) \
                  FROM journeys \
                  WHERE return_station={id}) as ending_journeys, \
                 (SELECT AVG(distance) \
                  FROM journeys \
                  WHERE departure_station={id}) as avg_starting_distance, \
                 (SELECT AVG(distance) \
                  FROM journeys \
                  WHERE return_station={id}) as avg_ending_distance \
          FROM stations \
          WHERE id={id}').fetchone()

    if not result:
        return 'Station not found', 404

    station = format_station_result(result)
    station['starting_journeys'] = result[-4]
    station['ending_journeys'] = result[-3]
    station['avg_starting_distance'] = round(float(result[-2]))
    station['avg_ending_distance'] = round(float(result[-1]))
    return station
