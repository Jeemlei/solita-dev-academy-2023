import React, { useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { Table } from 'react-bootstrap'
import { getJourneys } from '../../services/journey-service'
import { Journey } from '../../types'
import ListItem from './ListItem'
import PaginationNav from '../PaginationNav'
import PageSizeSelector from '../PageSizeSelector'

const JourneyList = () => {
	const [page, setPage] = useLocalStorageState('journeysPage', {
		defaultValue: 0,
	})
	const [pageSize, setPageSize] = useLocalStorageState('journeysPageSize', {
		defaultValue: 25,
	})
	const orderBy = 'departure_time'
	/* const [orderBy, setOrderBy] = useLocalStorageState<ColumnName>(
		'journeysOrderBy',
		{
			defaultValue: 'departure_time',
		}
	) */
	const [journeys, setJourneys] = useLocalStorageState<Array<Journey>>(
		'journeys',
		{
			defaultValue: [],
		}
	)
	const lastPage = 10

	useEffect(() => {
		let canceled = false
		getJourneys(page, pageSize, orderBy)
			.then(data => {
				if (!canceled) setJourneys(data)
			})
			.catch(error => console.log(error))
		return function cancel() {
			canceled = true
		}
	}, [page, pageSize, orderBy])

	return (
		<>
			<h2>Journeys</h2>
			<PageSizeSelector
				pageSizeOptions={[10, 25, 50]}
				pageSize={pageSize}
				setPageSize={setPageSize}
				setPage={setPage}
			/>
			<PaginationNav page={page} setPage={setPage} lastPage={lastPage} />
			<Table striped={journeys.length > 0} bordered responsive>
				<thead>
					<tr>
						<th>Departure</th>
						<th>Return</th>
						<th>Distance (km)</th>
						<th>Duration (min)</th>
					</tr>
				</thead>
				<tbody>
					{journeys.map(journey => (
						<ListItem key={journey.id} journey={journey} />
					))}
				</tbody>
			</Table>
			<PaginationNav page={page} setPage={setPage} lastPage={lastPage} />
		</>
	)
}

export default JourneyList
