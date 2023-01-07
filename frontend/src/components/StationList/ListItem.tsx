import React from 'react'
import { Station } from '../../types'

interface Props {
	station: Station
	handleClick: (station: Station) => void
}

const ListItem = ({ station, handleClick }: Props) => {
	return (
		<tr
			onClick={() => {
				handleClick(station)
			}}
		>
			<td>{station.id}</td>
			<td>{station.name}</td>
			<td>
				Lat: <i>{station.latlng[0].toFixed(5)}</i>, Lng:{' '}
				<i>{station.latlng[1].toFixed(5)}</i>
			</td>
		</tr>
	)
}

export default ListItem
