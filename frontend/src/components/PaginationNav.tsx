import React from 'react'
import { Pagination } from 'react-bootstrap'

interface Props {
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	lastPage: number
}

const PaginationNav = ({ page, setPage, lastPage }: Props) => {
	return (
		<Pagination style={{ justifyContent: 'center' }}>
			<Pagination.First
				disabled={page === 0}
				onClick={() => setPage(page => (page <= 0 ? 0 : page - 1))}
			/>
			<Pagination.Item as="input" active>
				{page + 1}
			</Pagination.Item>
			<Pagination.Last
				disabled={page === lastPage}
				onClick={() =>
					setPage(page => (lastPage <= page ? lastPage : page + 1))
				}
			/>
		</Pagination>
	)
}

export default PaginationNav
