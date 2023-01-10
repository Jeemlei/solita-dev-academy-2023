import axios from 'axios'
import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
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
			.catch(error => setBackendStatus(`Connection error!\n${error}`))
	}

	return (
		<div className="container" style={{ padding: '0.5rem' }}>
			<Tabs defaultActiveKey="stations" className="mb-3">
				<Tab eventKey="stations" title="Stations">
					<StationList />
				</Tab>
				<Tab eventKey="journeys" title="Journeys">
					<JourneyList />
				</Tab>
				<Tab eventKey="import" title="Import data">
					<ImportPage />
				</Tab>
				{DEV && (
					<Tab eventKey="debug" title="Debug">
						<div
							style={{
								border: 'solid',
								maxWidth: '18rem',
								padding: '1rem',
								margin: '.25rem',
							}}
						>
							<h6>Debug info:</h6>
							<p>Backend status: {backendStatus}</p>
							<button onClick={ping}>Ping</button>
						</div>
					</Tab>
				)}
			</Tabs>
		</div>
	)
}

export default App
