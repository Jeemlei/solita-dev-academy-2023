export interface Journey {
	id: number
	departure_time: string
	ds_id: number
	departure_station: string
	return_time: string
	rs_id: number
	return_station: string
	distance: number
	duration: number
}

export type ColumnName =
	| 'id'
	| 'departure_time'
	| 'ds_id'
	| 'departure_station'
	| 'return_time'
	| 'rs_id'
	| 'return_station'
	| 'distance'
	| 'duration'

export type LatLng = [number, number]

export interface Station {
	id: number
	name: string
	latlng: LatLng
}
