import React from 'react'
import { Form, Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'

interface Props {
	onSubmit: React.FormEventHandler<HTMLFormElement>
	onFileChange: React.ChangeEventHandler<HTMLInputElement>
	uploading: boolean
}

const ImportForm = ({ onSubmit, onFileChange, uploading }: Props) => {
	return (
		<Form onSubmit={onSubmit}>
			<Form.Group className="mb-2">
				<Form.Label>Add journey data:</Form.Label>
				<Form.Control
					type="file"
					accept="text/csv"
					onChange={onFileChange}
					style={{ maxWidth: '35rem' }}
				/>
				<Form.Text muted>
					Processing of the file can take up to a minute, dependending on the
					size of the file!
				</Form.Text>
			</Form.Group>
			<Button type="submit" disabled={uploading}>
				{uploading && <Spinner animation="border" size="sm" />} Send
			</Button>
		</Form>
	)
}

export default ImportForm
