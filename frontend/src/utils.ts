import { DetailedStation, Journey, LatLng, Station } from './types'

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

export const isNumber = (number: unknown): number is number => {
	return typeof number === 'number' || number instanceof Number
}

export const toJourneyArray = (data: unknown): Array<Journey> => {
	if (!Array.isArray(data)) return []
	return data.filter((journey): journey is Journey => {
		return (
			isNumber(journey.id) &&
			isString(journey.departure_time) &&
			isNumber(journey.ds_id) &&
			isString(journey.departure_station) &&
			isString(journey.return_time) &&
			isNumber(journey.rs_id) &&
			isString(journey.return_station) &&
			isNumber(journey.distance) &&
			isNumber(journey.duration)
		)
	})
}

const isLatLng = (latlng: unknown): latlng is LatLng => {
	return (
		Array.isArray(latlng) &&
		latlng.length === 2 &&
		isNumber(latlng[0]) &&
		isNumber(latlng[1])
	)
}

const isStation = (station: unknown): station is Station => {
	return (
		station !== null &&
		typeof station === 'object' &&
		'id' in station &&
		isNumber(station.id) &&
		'name' in station &&
		isString(station.name) &&
		'latlng' in station &&
		isLatLng(station.latlng)
	)
}

export const toStationArray = (data: unknown) => {
	if (!Array.isArray(data)) return []
	return data.filter(isStation)
}

const isDetailedStation = (station: unknown): station is DetailedStation => {
	return (
		isStation(station) &&
		'starting_journeys' in station &&
		'ending_journeys' in station &&
		'avg_starting_distance' in station &&
		'avg_ending_distance' in station
	)
}

export const toDetailedStation = (data: unknown): DetailedStation => {
	if (isDetailedStation(data)) return data
	return {
		id: -1,
		name: 'Unknown',
		latlng: [0, 0],
		starting_journeys: 0,
		ending_journeys: 0,
		avg_starting_distance: 0,
		avg_ending_distance: 0,
	}
}
