import pandas as pd
from db import db_engine, db
from services.tools import format_journey_result, parse_to_int, parse_to_journey_column


def import_journey_csv(file):
    # Renaming the columns to match db names
    df = pd.read_csv(file).rename(
        columns={'Departure': 'departure_time',
                 'Return': 'return_time',
                 'Departure station id': 'departure_station',
                 'Return station id': 'return_station',
                 'Covered distance (m)': 'distance',
                 'Duration (sec.)': 'duration'})

    service_locations = [754, 997, 999]

    valid_rows = df[['departure_time',
                     'return_time',
                     'departure_station',
                     'return_station',
                     'distance',
                     'duration']].loc[(df['distance'] >= 10) &
                                      (df['duration'] >= 10) &
                                      ~(df['departure_station'].isin(service_locations) |
                                        df['return_station'].isin(service_locations))]

    valid_rows.to_sql('journeys',
                      db_engine,
                      if_exists='append',
                      index=False)


def get_journeys(page, page_size, order_by):
    page = parse_to_int(page, default=0)
    page_size = parse_to_int(page_size, default=10)
    order_by = parse_to_journey_column(order_by, default='departure_time')

    result = db.session.execute(f'SELECT j.id, j.departure_time, ds.id as ds_id, \
                                         ds.station_name as departure_station, \
                                         j.return_time, rs.id as rs_id, \
                                         rs.station_name as return_station, \
                                         j.distance, j.duration \
                                  FROM journeys j \
                                  JOIN stations ds ON j.departure_station = ds.id \
                                  JOIN stations rs ON j.return_station = rs.id \
                                  ORDER BY {order_by}, departure_station \
                                  LIMIT {page_size} OFFSET {page*page_size}')

    return list(map(lambda journey: format_journey_result(journey), result))


def get_last_page(page_size):
    page_size = parse_to_int(page_size, default=0)
    if (page_size < 1):
        return 0

    result = db.session.execute(f'SELECT COUNT(id) / {page_size * 1.0} \
                                  FROM journeys').fetchone()

    return parse_to_int(result[0], default=0)
