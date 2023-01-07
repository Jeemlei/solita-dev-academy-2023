import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import useLocalStorageState from 'use-local-storage-state'
import { getStations } from '../../services/station-service'
import { Station } from '../../types'
import ListItem from './ListItem'
import PaginationNav from '../PaginationNav'
import StationModal from './StationModal'

const StationList = () => {
	const [page, setPage] = useLocalStorageState('stationsPage', {
		defaultValue: 0,
	})
	const pageSize = 25
	/* const [pageSize, setPageSize] = useLocalStorageState('stationsPageSize', {
		defaultValue: 25,
	}) */
	const [stations, setStations] = useLocalStorageState<Array<Station>>(
		'stations',
		{
			defaultValue: [],
		}
	)
	const [showStation, setShowStation] = useState(false)
	const [stationToShow, setStationToShow] = useState<Station>()

	useEffect(() => {
		if (stations.length === 0) {
			getStations()
				.then(stations => setStations(stations))
				.catch(error => console.log(error))
			console.log(stations)
		}
	}, [])

	const handleRowClick = (station: Station) => {
		setStationToShow(station)
		setShowStation(true)
	}

	const handleCloseStation = () => setShowStation(false)

	return (
		<>
			<h2>Stations</h2>
			<PaginationNav
				page={page}
				setPage={setPage}
				lastPage={Math.floor(stations.length / pageSize)}
			/>
			<Table striped={stations.length > 0} bordered hover responsive>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Location</th>
					</tr>
				</thead>
				<tbody>
					{stations
						.slice(
							page * pageSize,
							Math.min(page * pageSize + pageSize, stations.length - 1)
						)
						.map(station => (
							<ListItem
								handleClick={handleRowClick}
								key={station.id}
								station={station}
							/>
						))}
				</tbody>
			</Table>
			<PaginationNav
				page={page}
				setPage={setPage}
				lastPage={Math.floor(stations.length / pageSize)}
			/>
			<StationModal
				show={showStation}
				handleClose={handleCloseStation}
				station={stationToShow}
			/>
		</>
	)
}

export default StationList
