import axios from 'axios'
import { BACKEND_URL } from '../config'
import { ColumnName, Journey } from '../types'
import { isNumber, toJourneyArray } from '../utils'

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
	pageSize: number,
	orderBy: ColumnName
): Promise<Array<Journey>> => {
	const res = await axios.get(
		`${BACKEND_URL}/api/journeys?page=${page}&page_size=${pageSize}&order_by=${orderBy}`
	)
	return toJourneyArray(res.data)
}

export const getLastPage = async (pageSize: number): Promise<number> => {
	const res = await axios.get(
		`${BACKEND_URL}/api/journeys/last_page?page_size=${pageSize}`
	)
	const lastPage = res.data.last_page
	return isNumber(lastPage) ? lastPage : 0
}
