import React from 'react'
import {
	MapContainer as LeafletMap,
	TileLayer,
	LayersControl,
	Marker,
	Popup,
} from 'react-leaflet'
import { LatLng, Station } from '../../types'

interface Props {
	stations: Array<Station>
	popup: boolean
	center: LatLng
	zoom: number
}

const Map = ({ stations, popup, center, zoom }: Props) => {
	return (
		<LeafletMap
			style={{ height: '500px', width: '100%' }}
			center={center}
			zoom={zoom}
			scrollWheelZoom={true}
		>
			<LayersControl>
				<LayersControl.BaseLayer checked name="OpenStreetMap">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="Esri Satellite">
					<TileLayer
						attribution='&copy; <a href="https://www.esri.com/en-us/legal/overview">Esri</a> contributors'
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					/>
				</LayersControl.BaseLayer>
			</LayersControl>
			{stations.map(station => (
				<Marker
					key={station.id}
					position={[station.latlng[0], station.latlng[1]]}
					title={station.latlng.toString()}
				>
					{popup && (
						<Popup>
							<b>{station.name}</b>
							<br />
							ID: {station.id}
						</Popup>
					)}
				</Marker>
			))}
		</LeafletMap>
	)
}

export default Map
