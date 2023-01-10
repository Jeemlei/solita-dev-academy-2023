import React, { useEffect } from 'react'

interface ButtonProps {
	currentSize: number
	desiredSize: number
	setSize: React.Dispatch<React.SetStateAction<number>>
}

const PageSizeButton = ({ currentSize, desiredSize, setSize }: ButtonProps) => {
	return (
		<button
			onClick={() => setSize(desiredSize)}
			disabled={currentSize === desiredSize}
			style={{
				border: 'none',
				color: 'blue',
				textDecorationLine: currentSize === desiredSize ? 'underline' : 'none',
			}}
		>
			{desiredSize}
		</button>
	)
}

interface SelectorProps {
    pageSizeOptions: Array<number>
	pageSize: number
	setPageSize: React.Dispatch<React.SetStateAction<number>>
	setPage: React.Dispatch<React.SetStateAction<number>>
}

const PageSizeSelector = ({
    pageSizeOptions,
	pageSize,
	setPageSize,
	setPage,
}: SelectorProps) => {
	useEffect(() => setPage(0), [pageSize])
	return (
		<>
			<p style={{ marginTop: 'auto', marginBottom: 'auto' }}>Page size:</p>
			{pageSizeOptions.map(desiredSize => (
				<PageSizeButton
					key={desiredSize}
					currentSize={pageSize}
					desiredSize={desiredSize}
					setSize={setPageSize}
				/>
			))}
		</>
	)
}

export default PageSizeSelector
