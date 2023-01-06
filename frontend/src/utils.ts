import { Journey, LatLng, Station } from './types'

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

const isNumber = (number: unknown): number is number => {
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

export const toStationArray = (data: unknown) => {
	if (!Array.isArray(data)) return []
	return data.filter((station): station is Station => {
		return (
			isNumber(station.id) &&
			isString(station.name) &&
			isLatLng(station.latlng)
		)
	})
}
