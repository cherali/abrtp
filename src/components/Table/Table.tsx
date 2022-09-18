import type { ReactNode } from 'react'
import BTable from 'react-bootstrap/Table'
import Loading from 'components/Loading'
import Pagination from './Pagination'
import { getDescendantProp } from 'utils/string'

import classes from './table.styles.module.scss'

type CellType = JSX.Element | JSX.Element[] | ReactNode

export interface Column<T> {
	accessor: keyof T | string
	header: string
	Cell?: (value: T) => CellType
}

interface TableProps<T extends object> {
	columns: Array<Column<T>>
	data: Array<T> | undefined
	showTableNumber?: boolean
	loading?: boolean
	pageRoute: string
	paginationProps?: {
		currentPage: number
		boundaryCount?: number
		pageCount?: number
		pageSize?: number
	}
}

const Table = <T extends object>({ columns, data, showTableNumber = false, loading = false, pageRoute, paginationProps }: TableProps<T>) => {
	return (
		<div>
			{loading && <Loading />}

			{!loading && data && (
				<>
					<BTable responsive>
						<thead className={classes.thead}>
							<tr>
								{showTableNumber && <th>#</th>}
								{columns.map((column, index) => (
									<th key={index}>{column.header}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{!loading && data?.length === 0 && (
								<tr>
									<td className='text-center' colSpan={columns.length + (showTableNumber ? 1 : 0)}>
										No Data
									</td>
								</tr>
							)}

							{data.map((row, index) => (
								<tr key={index}>
									{showTableNumber && <td>{index + 1 + Number(paginationProps?.pageSize || 0) * (Number(paginationProps?.currentPage || 0) - 1)}</td>}
									{columns.map((column, i) => {
										const render = column.Cell ? column.Cell : () => getDescendantProp<string>(row, column.accessor)

										return <td key={i}>{render(row)}</td>
									})}
								</tr>
							))}
						</tbody>
					</BTable>

					<div className='d-flex mt-5'>
						<Pagination
							boundaryCount={paginationProps?.boundaryCount}
							currentPage={paginationProps?.currentPage}
							pageCount={paginationProps?.pageCount}
							pageRoute={pageRoute}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Table
