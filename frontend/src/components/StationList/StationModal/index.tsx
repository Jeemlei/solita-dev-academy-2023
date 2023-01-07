import React from 'react'
import { Modal } from 'react-bootstrap'
import { Station } from '../../../types'
import StationDetails from './StationDetails'

interface Props {
	show: boolean
	handleClose: () => void
	station: Station | undefined
}

const StationModal = ({ show, handleClose, station }: Props) => {
	if (!station) return <></>
	return (
		<>
			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{station.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<StationDetails station={station} />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default StationModal
