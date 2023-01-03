import pandas as pd
from db import db_engine


def import_journey_csv(file):
    # Renaming the columns to match db names
    df = pd.read_csv(file.file).rename(
        columns={'Departure': 'departure_time',
                 'Return': 'return_time',
                 'Departure station id': 'deparure_station',
                 'Return station id': 'return_station',
                 'Covered distance (m)': 'distance',
                 'Duration (sec.)': 'duration'})

    service_locations = [754, 997, 999]

    valid_rows = df[['departure_time',
                     'return_time',
                     'deparure_station',
                     'return_station',
                     'distance',
                     'duration']].loc[(df['distance'] >= 10) &
                                      (df['duration'] >= 10) &
                                      ~(df['deparure_station'].isin(service_locations) |
                                        df['return_station'].isin(service_locations))]

    valid_rows.to_sql('journeys',
                      db_engine,
                      if_exists='append',
                      index=False)
