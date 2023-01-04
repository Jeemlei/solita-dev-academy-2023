import axios from 'axios'
import { BACKEND_URL } from '../config'
import { ColumnName, Journey } from '../types'
import { toJourneyArray } from '../utils'

export const importJourneysCSV = async (file: Blob) => {
	const formData = new FormData()
	formData.append('file', file)
	const res = await axios.post(`${BACKEND_URL}/api/journeys`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return { status: res.status, data: res.data as string }
}

export const getJourneys = async (
	page: number,
	page_size: number,
	order_by: ColumnName
): Promise<Array<Journey>> => {
	const res = await axios.get(
		`${BACKEND_URL}/api/journeys?page=${page}&page_size=${page_size}&order_by=${order_by}`
	)
	return toJourneyArray(res.data)
}
