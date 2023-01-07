import React, { useEffect, useState } from 'react'
import { getStationAddress } from '../../../services/station-service'
import { Station } from '../../../types'

interface Props {
	station: Station
}

const StationDetails = ({ station }: Props) => {
	const [address, setAddress] = useState<string>()

	useEffect(() => {
		getStationAddress(station.latlng[0], station.latlng[1])
			.then(res => setAddress(res))
			.catch(error => console.log(error))
	}, [])

	return <>{address}</>
}

export default StationDetails
