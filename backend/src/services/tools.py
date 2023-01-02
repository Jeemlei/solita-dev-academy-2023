import re


def format_station_result(db_station):
    print(db_station)
    return {'id': db_station[0],
            'name': db_station[1],
            'latlng': tuple(map(float,
                                re.sub('[()]',
                                       '',
                                       db_station[2]).split(',')))}
