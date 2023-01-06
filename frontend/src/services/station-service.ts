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
