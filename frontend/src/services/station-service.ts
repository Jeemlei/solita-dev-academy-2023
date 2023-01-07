import axios from 'axios'
import { BACKEND_URL } from '../config'
import { Station } from '../types'
import { toStationArray } from '../utils'

export const getStations = async (): Promise<Array<Station>> => {
	const res = await axios.get(
		`${BACKEND_URL}/api/stations`
	)
	return toStationArray(res.data)
}

export const getStationAddress = async (lat: number, lng: number): Promise<string> => {
	const res = await axios.get(
		`${BACKEND_URL}/api/geocode/address?lat=${lat}&lng=${lng}`
	)
	return res.data
}