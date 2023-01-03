import axios from 'axios'
import BACKEND_URL from '../config'

export const import_journeys_csv = async (file: Blob) => {
	const formData = new FormData()
	formData.append('file', file)
	const res = await axios.post(`${BACKEND_URL}/api/journeys`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return { status: res.status, data: res.data as string }
}
