import { FC, useEffect, useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Button from 'components/Button'
import Table from 'components/Table'
import { Column } from 'components/Table/Table'
import { ARTICLES_ROUTE, EDIT_ARTICLE_ROUTE } from 'constants/routes'
import { Article, useGetArticlesListQuery } from './Articles.services'

import classes from './articles.styles.module.scss'

interface PageParams {
	pageIndex?: number | string
}

const Articles: FC = () => {
	const itemPerPage = 10
	const { pageIndex: urlPageIndex } = useParams<Record<keyof PageParams, string>>()
	const [pageIndex, setPageIndex] = useState<number>(Number(urlPageIndex || 1))

	const apiData = {
		limit: itemPerPage,
		offset: (pageIndex - 1) * itemPerPage
	}

	const { data: articles, isFetching } = useGetArticlesListQuery(apiData)

	useEffect(() => {
		setPageIndex(Number(urlPageIndex || 1))
	}, [urlPageIndex])

	const columns: Array<Column<Article>> = [
		{ accessor: 'title', header: 'Title' },
		{ accessor: 'author.username', header: 'Author' },
		{
			accessor: 'tagList',
			header: 'Tags',
			Cell: ({ tagList }) => {
				return tagList?.join(', ')
			}
		},
		{
			accessor: 'body',
			header: 'Excerpt',
			Cell: ({ body }) => {
				const text = body.split(' ')
				const hasDot = text.length > 20
				return text.slice(0, 20).join(' ') + (hasDot ? '...' : '')
			}
		},
		{
			accessor: 'createdAt',
			header: 'Created At',
			Cell: ({ createdAt }) => {
				return new Date(createdAt).toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })
			}
		},
		{
			accessor: '',
			header: 'Actions',
			Cell: ({ slug }: Article) => (
				<DropdownButton className={classes.action} drop='down' variant='info' title={`...`}>
					<Link className='dropdown-item' to={EDIT_ARTICLE_ROUTE.replace(':slug', slug)}>
						Edit
					</Link>
					<Dropdown.Divider />
					<Button fullWidth className={classes['action-button']} variant='dark'>
						Delete
					</Button>
				</DropdownButton>
			)
		}
	]
	// TODO: pagination props most fetched from api NOT HARDCODED
	return (
		<div>
			<h1 className='mb-4'>All Posts</h1>

			<Table
				columns={columns}
				data={articles?.articles}
				showTableNumber
				loading={!articles?.articles || isFetching}
				pageRoute={ARTICLES_ROUTE}
				paginationProps={{
					pageCount: 1,
					currentPage: pageIndex,
					boundaryCount: 5,
					pageSize: itemPerPage
				}}
			/>
		</div>
	)
}

export default Articles
