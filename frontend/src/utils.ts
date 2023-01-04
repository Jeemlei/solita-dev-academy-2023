import { Journey } from './types'

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

const isNumber = (number: unknown): number is number => {
	return typeof number === 'number' || number instanceof Number
}

export const toJourneyArray = (data: unknown) => {
	if (!Array.isArray(data)) return []
	return data.filter((journey): journey is Journey => {
		return (
			journey.id &&
			isNumber(journey.id) &&
			journey.departure_time &&
			isString(journey.departure_time) &&
			journey.ds_id &&
			isNumber(journey.ds_id) &&
			journey.departure_station &&
			isString(journey.departure_station) &&
			journey.return_time &&
			isString(journey.return_time) &&
			journey.rs_id &&
			isNumber(journey.rs_id) &&
			journey.return_station &&
			isString(journey.return_station) &&
			journey.distance &&
			isNumber(journey.distance) &&
			journey.duration &&
			isNumber(journey.duration)
		)
	})
}
