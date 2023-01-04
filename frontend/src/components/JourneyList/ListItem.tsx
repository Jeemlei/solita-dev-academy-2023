import React from 'react'
import { Journey } from '../../types'

interface Props {
	journey: Journey
}

const ListItem = ({ journey }: Props) => {
	return (
		<tr>
			<td>{journey.departure_station}</td>
			<td>{journey.return_station}</td>
			<td>{Math.round(journey.distance / 1000).toFixed(2)}</td>
			<td>{Math.round(journey.duration / 60).toFixed(0)}</td>
		</tr>
	)
}

export default ListItem
