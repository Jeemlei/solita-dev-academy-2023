import axios from 'axios'
import React, { useState } from 'react'
import ImportPage from './components/ImportPage'
import JourneyList from './components/JourneyList'
import StationList from './components/StationList'
import { BACKEND_URL, DEV } from './config'

function App() {
	const [backendStatus, setBackendStatus] = useState('unknown')

	const ping = () => {
		axios
			.get(`${BACKEND_URL}/api/ping`)
			.then(res => {
				console.log(res)
				setBackendStatus('Alive!')
			})
			.catch(() => setBackendStatus('Connection error!'))
	}

	return (
		<div className="container">
			{DEV && (
				<>
					<p>Backend status: {backendStatus}</p>
					<button onClick={ping}>Ping</button>
				</>
			)}
			<ImportPage />
			<JourneyList />
			<StationList />
		</div>
	)
}

export default App
