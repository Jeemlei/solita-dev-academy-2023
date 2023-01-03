import axios from 'axios'
import React, { useState } from 'react'
import ImportPage from './components/ImportPage'
import BACKEND_URL from './config'

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
		<div className="App">
			<p>Backend status: {backendStatus}</p>
			<button onClick={ping}>Ping</button>
			<ImportPage />
		</div>
	)
}

export default App
