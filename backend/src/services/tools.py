import re


def format_station_result(db_station):
    return {'id': db_station[0],
            'name': db_station[1],
            'latlng': tuple(map(float,
                                re.sub('[()]',
                                       '',
                                       db_station[2]).split(',')))}


def format_journey_result(db_journey):
    return {'id': db_journey[0],
            'departure_time': db_journey[1].strftime("%FT%H:%M:%S"),
            'ds_id': db_journey[2],
            'departure_station': db_journey[3],
            'return_time': db_journey[4].strftime("%FT%H:%M:%S"),
            'rs_id': db_journey[5],
            'return_station': db_journey[6],
            'distance': db_journey[7],
            'duration': db_journey[8]}


def parse_to_int(value, default):
    try:
        return int(value)
    except:
        return default


def parse_to_journey_column(value, default):
    column_names = set(['id', 'departure_time', 'ds_id',
                        'departure_station', 'return_time',
                        'rs_id', 'return_station',
                        'distance', 'duration'])
    default = default if default in column_names else 'departure_time'
    return value if value in column_names else default
