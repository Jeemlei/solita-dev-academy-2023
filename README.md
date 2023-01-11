# solita-dev-academy-2023
This is a pre-assignment submission for Solita Dev Academy Finland 2023.

### Live demo @heroku
[https://solita-dev-academy-2023.herokuapp.com/](https://solita-dev-academy-2023.herokuapp.com/)

## Guides
- [Frontend](frontend/README.md)
- [Backend](backend/README.md)

## Data from 2021

- [Bike stations](https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv)
  - Stations-data does not include the city bike service locations:
    - ID: 754, 'Lintumetsä'
    - ID: 997, 'Workshop Helsinki'
    - ID: 999, 'Bike Production'
- [Journeys taken](https://dev.hsl.fi/citybikes/od-trips-2021/od-trips-2021.zip)

## Implemented features

### Data import

#### Recommended
- [x] Import data from the CSV files to a database
- Validate data before importing
  - [x] No journeys that lasted for less than ten seconds
  - [x] No journeys that covered distances shorter than 10 meters
  
#### Additional
- Validate data before importing
  - [x] No journeys that start from a city bike service location
  - [x] No journeys that end at a city bike service location

### Journey list view

#### Recommended
- [x] List journeys
- For each journey show
  - [x] departure station 
  - [x] return stations
  - [x] covered distance in kilometers
  - [x] duration in minutes

#### Additional
- [x] Pagination
- Ordering per column
  - [x] API-endpoint
  - [ ] UI
- [ ] Searching
- [ ] Filtering

### Station list

#### Recommended
- [x] List all the stations

#### Additional
- [x] Pagination
- [ ] Searching

### Single station view

#### Recommended
- [x] Station name
- [x] Station address
- [x] Total number of journeys starting from the station
- [x] Total number of journeys ending at the station

#### Additional
- [x] Station location on the map
- [ ] The average distance of a journey starting from the station
- [ ] The average distance of a journey ending at the station
- [ ] Top 5 most popular return stations for journeys starting from the station
- [ ] Top 5 most popular departure stations for journeys ending at the station
- [ ] Ability to filter all the calculations per month

### Surprise us with
- [x] Endpoints to store new journeys data
- [ ] Endpoints to store new bicycle stations
- [ ] Running backend in Docker
- [x] Running backend in Cloud
- [ ] Implement E2E tests
- [x] Create UI for adding journeys 
- [ ] Create UI for adding bicycle stations
