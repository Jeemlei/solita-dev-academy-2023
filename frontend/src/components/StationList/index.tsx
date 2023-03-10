import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import useLocalStorageState from 'use-local-storage-state'
import { getStations } from '../../services/station-service'
import { Station } from '../../types'
import ListItem from './ListItem'
import PaginationNav from '../PaginationNav'
import StationModal from './StationModal'
import Map from '../Map'
import PageSizeSelector from '../PageSizeSelector'

const StationList = () => {
	const [page, setPage] = useLocalStorageState('stationsPage', {
		defaultValue: 0,
	})
	const [pageSize, setPageSize] = useLocalStorageState('stationsPageSize', {
		defaultValue: 25,
	})
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
			<hr />
			<Map stations={stations} popup={true} center={[60.22, 24.94]} zoom={11} />
			<hr />
			<PageSizeSelector
				pageSizeOptions={[10, 25, 50]}
				pageSize={pageSize}
				setPageSize={setPageSize}
				setPage={setPage}
			/>
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
