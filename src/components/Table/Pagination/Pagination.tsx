import { FC, useMemo } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import BPagination from 'react-bootstrap/Pagination'

interface PaginationProps {
	currentPage?: number
	boundaryCount?: number
	pageCount?: number
	pageRoute: string
}

const Pagination: FC<PaginationProps> = ({ currentPage = 1, boundaryCount = 3, pageCount = 1, pageRoute }) => {
	const boundaryDomain = useMemo(() => Math.floor(boundaryCount / 2), [boundaryCount])

	const startPage = useMemo(() => {
		let start

		if (currentPage - boundaryDomain > 0 && boundaryCount < pageCount) {
			if (currentPage + 3 >= pageCount) {
				start = pageCount - boundaryCount + 1
			} else {
				start = currentPage - boundaryDomain
			}
		} else start = 1

		return start
	}, [currentPage, pageCount, boundaryCount, boundaryDomain])

	const countItemShow = boundaryCount > pageCount ? pageCount : boundaryCount

	return (
		<div className='d-inline-block m-auto'>
			<BPagination>
				<li className='page-item'>
					<Link
						to={currentPage === 2 ? pageRoute : `${pageRoute}/page/${currentPage - 1}`}
						className={clsx('page-link', currentPage <= 1 && 'disabled')}
						role='button'
						tabIndex={currentPage <= 1 ? -1 : 0}
					>
						<span aria-hidden='true'>{'<'}</span>
						<span className='visually-hidden'>Previous</span>
					</Link>
				</li>

				{currentPage - boundaryDomain > 1 && (
					<>
						<li className='page-item'>
							<Link to={pageRoute} className='page-link'>
								1
							</Link>
						</li>

						<BPagination.Ellipsis disabled />
					</>
				)}

				{Array(countItemShow)
					.fill('')
					.map((_item, index) => {
						const pageNumber = startPage + index
						return (
							<li key={pageNumber} className={clsx('page-item', currentPage === pageNumber && 'active')}>
								<Link to={pageNumber === 1 ? pageRoute : `${pageRoute}/page/${pageNumber}`} className='page-link'>
									{pageNumber}
								</Link>
							</li>
						)
					})}

				{currentPage + boundaryDomain <= pageCount - 2 && <BPagination.Ellipsis disabled />}
				{currentPage + boundaryDomain <= pageCount - 1 && (
					<li className='page-item'>
						<Link to='/articles' className='page-link'>
							{pageCount}
						</Link>
					</li>
				)}

				<li className='page-item'>
					<Link
						to={`${pageRoute}/page/${currentPage + 1}`}
						className={clsx('page-link', currentPage >= pageCount && 'disabled')}
						role='button'
						tabIndex={currentPage >= pageCount ? -1 : 0}
					>
						<span aria-hidden='true'>{'>'}</span>
						<span className='visually-hidden'>Next</span>
					</Link>
				</li>
			</BPagination>
		</div>
	)
}

export default Pagination
