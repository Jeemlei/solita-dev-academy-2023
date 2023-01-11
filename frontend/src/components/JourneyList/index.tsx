import React, { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { Placeholder, Table } from 'react-bootstrap'
import { getJourneys, getLastPage } from '../../services/journey-service'
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
	const [lastPage, setLastPage] = useState<number>()
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

	const [loadingJourneys, setLoadingJourneys] = useState(false)

	useEffect(() => {
		getLastPage(pageSize)
			.then(data => setLastPage(data))
			.catch(error => console.log(error))
	}, [pageSize])

	useEffect(() => {
		let canceled = false
		setLoadingJourneys(true)
		getJourneys(page, pageSize, orderBy)
			.then(data => {
				if (!canceled) {
					setJourneys(data)
					setLoadingJourneys(false)
				}
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
			<PaginationNav page={page} setPage={setPage} lastPage={lastPage ?? 0} />
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
					{(loadingJourneys &&
						Array.from({ length: pageSize }, (v, i) => i).map(key => (
							<tr key={key}>
								<td>
									<Placeholder animation="wave">
										<Placeholder xs={6} />
									</Placeholder>
								</td>
								<td>
									<Placeholder animation="wave">
										<Placeholder xs={9} />
									</Placeholder>
								</td>
								<td>
									<Placeholder animation="wave">
										<Placeholder xs={3} />
									</Placeholder>
								</td>
								<td>
									<Placeholder animation="wave">
										<Placeholder xs={3} />
									</Placeholder>
								</td>
							</tr>
						))) ||
						journeys.map(journey => (
							<ListItem key={journey.id} journey={journey} />
						))}
				</tbody>
			</Table>
			<PaginationNav page={page} setPage={setPage} lastPage={lastPage ?? 0} />
		</>
	)
}

export default JourneyList
