import React, { useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { Table } from 'react-bootstrap'
import { getJourneys } from '../../services/data-service'
import { ColumnName, Journey } from '../../types'
import ListItem from './ListItem'
import PageNav from './PageNav'

const JourneyList = () => {
	const [page, setPage] = useLocalStorageState('page', {
		defaultValue: 0,
	})
	const pageSize = 25
	const orderBy: ColumnName = 'departure_time'
	/* const [pageSize, setPageSize] = useLocalStorageState('pageSize', {
		defaultValue: 25,
	})
	const [orderBy, setOrderBy] = useLocalStorageState<ColumnName>('orderBy', {
		defaultValue: 'departure_time',
	}) */
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
			<PageNav page={page} setPage={setPage} lastPage={lastPage} />
			<Table striped={journeys.length > 0} bordered>
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
			<PageNav page={page} setPage={setPage} lastPage={lastPage} />
		</>
	)
}

export default JourneyList
