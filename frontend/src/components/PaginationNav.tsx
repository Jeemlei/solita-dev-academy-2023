import React from 'react'
import { Pagination } from 'react-bootstrap'

interface Props {
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	lastPage: number
}

const PaginationNav = ({ page, setPage, lastPage }: Props) => {
	return (
		<>
			<Pagination style={{ justifyContent: 'center' }}>
				<Pagination.Item
					as="input"
					disabled={page === 0}
					onClick={() => setPage(0)}
				>
					⇤
				</Pagination.Item>
				<Pagination.Item
					as="input"
					disabled={page - 5 < 0}
					onClick={() => setPage(page => page - 5)}
				>
					-5
				</Pagination.Item>
				<Pagination.Prev
					disabled={page === 0}
					onClick={() => setPage(page => (page <= 0 ? 0 : page - 1))}
				/>
				<Pagination.Item as="input" active>
					{page + 1}
				</Pagination.Item>
				<Pagination.Next
					disabled={page === lastPage}
					onClick={() =>
						setPage(page => (lastPage <= page ? lastPage : page + 1))
					}
				/>
				<Pagination.Item
					as="input"
					disabled={lastPage < page + 5}
					onClick={() => setPage(page => page + 5)}
				>
					+5
				</Pagination.Item>
				<Pagination.Item
					as="input"
					disabled={page === lastPage}
					onClick={() => setPage(lastPage)}
				>
					⇥
				</Pagination.Item>
			</Pagination>
		</>
	)
}

export default PaginationNav
