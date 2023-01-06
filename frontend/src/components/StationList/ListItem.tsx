import React from 'react'
import { Station } from '../../types'

interface Props {
	station: Station
}

const ListItem = ({ station }: Props) => {
	return (
		<tr>
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
