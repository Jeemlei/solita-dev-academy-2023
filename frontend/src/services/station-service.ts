import axios from 'axios'
import { BACKEND_URL } from '../config'
import { DetailedStation, Station } from '../types'
import { toDetailedStation, toStationArray } from '../utils'

export const getStations = async (): Promise<Array<Station>> => {
	const res = await axios.get(`${BACKEND_URL}/api/stations`)
	return toStationArray(res.data)
}

export const getStationAddress = async (
	lat: number,
	lng: number
): Promise<string> => {
	const res = await axios.get(
		`${BACKEND_URL}/api/geocode/address?lat=${lat}&lng=${lng}`
	)
	return res.data
}

export const getStationDetails = async (
	id: number
): Promise<DetailedStation> => {
	const res = await axios.get(`${BACKEND_URL}/api/stations/${id}`)
	return toDetailedStation(res.data)
}
