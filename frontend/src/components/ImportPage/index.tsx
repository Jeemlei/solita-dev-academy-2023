import React, { useState } from 'react'
import { importJourneysCSV } from '../../services/data-service'
import ImportForm from './ImportForm'

function ImportPage() {
	const [file, setFile] = useState<Blob | null>(null)
	const [uploading, setUploading] = useState<boolean>(false)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target.files ? e.target.files.item(0) : null)
	}

	const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!file) return
		setUploading(true)
		try {
			await importJourneysCSV(file)
			const form = e.target as HTMLFormElement
			form.reset()
			setFile(null)
		} catch (error) {
            console.log(error)
        }
		setUploading(false)
	}

	return (
		<>
			<h3>Import journeys</h3>
			<ImportForm
				uploading={uploading}
				onFileChange={handleFileChange}
				onSubmit={handleFileSubmit}
			/>
		</>
	)
}

export default ImportPage
