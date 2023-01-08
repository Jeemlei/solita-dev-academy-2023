import React, { useEffect, useState } from 'react'
import { Placeholder } from 'react-bootstrap'
import {
	getStationAddress,
	getStationDetails,
} from '../../../services/station-service'
import { DetailedStation, Station } from '../../../types'

interface Props {
	station: Station
}

const StationDetails = ({ station }: Props) => {
	const [address, setAddress] = useState<string>()
	const [stationDetails, setStationDetails] = useState<DetailedStation>()

	useEffect(() => {
		getStationAddress(station.latlng[0], station.latlng[1])
			.then(res => setAddress(res))
			.catch(error => console.log(error))
		getStationDetails(station.id)
			.then(res => setStationDetails(res))
			.catch(error => console.log(error))
	}, [])

	return (
		<>
			{address || (
				<Placeholder animation="glow">
					<Placeholder xs={8} />
				</Placeholder>
			)}
			<br />
			Journeys started:{' '}
			{(stationDetails && stationDetails.starting_journeys) || (
				<Placeholder animation="glow">
					{' '}
					<Placeholder xs={1} />
				</Placeholder>
			)}
			<br />- average distance:
			{(stationDetails &&
				` ${(stationDetails.avg_starting_distance / 1000).toFixed(1)}km`) || (
				<Placeholder animation="glow">
					{' '}
					<Placeholder xs={1} />
				</Placeholder>
			)}
			<br />
			Journeys ended:{' '}
			{(stationDetails && stationDetails.ending_journeys) || (
				<Placeholder animation="glow">
					{' '}
					<Placeholder xs={1} />
				</Placeholder>
			)}
			<br />- average distance:
			{(stationDetails &&
				` ${(stationDetails.avg_ending_distance / 1000).toFixed(1)}km`) || (
				<Placeholder animation="glow">
					{' '}
					<Placeholder xs={1} />
				</Placeholder>
			)}
		</>
	)
}

export default StationDetails
