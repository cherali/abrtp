import { FC, useEffect, useState } from 'react'
import { Dropdown, DropdownButton, Modal } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from 'components/Button'
import Table from 'components/Table'
import { Column } from 'components/Table/Table'
import { ARTICLES_ROUTE, EDIT_ARTICLE_ROUTE } from 'constants/routes'
import { ActionErrorType } from 'utils/apiUtil'
import { Article, useDeleteArtileMutation, useGetArticlesListQuery } from './Articles.services'

import classes from './articles.styles.module.scss'

interface PageParams {
	pageIndex?: number | string
}

const Articles: FC = () => {
	const itemPerPage = 10
	const { pageIndex: urlPageIndex } = useParams<Record<keyof PageParams, string>>()
	const [pageIndex, setPageIndex] = useState<number>(Number(urlPageIndex || 1))
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const [slug, setSlug] = useState<string>('')

	const handleCloseDeleteConfirmation = () => setShowDeleteConfirmation(false)
	const handleShowDeleteConfirmation = (slug: string) => () => {
		setShowDeleteConfirmation(true)
		setSlug(slug)
	}

	const apiData = {
		limit: itemPerPage,
		offset: (pageIndex - 1) * itemPerPage
	}

	const { data: articles, isFetching, refetch } = useGetArticlesListQuery(apiData)
	const [deleteArticle, deleteArticleResult] = useDeleteArtileMutation()

	const handleDeleteArticle = () => {
		deleteArticle({ slug })
	}

	useEffect(() => {
		setPageIndex(Number(urlPageIndex || 1))
	}, [urlPageIndex])

	useEffect(() => {
		// if success
		if (deleteArticleResult.isSuccess) {
			// show toaster
			toast.success('Article deleted successfuly')

			// close modal
			setShowDeleteConfirmation(false)

			// refetch data
			refetch()
		}
		// if errors
		else if (deleteArticleResult.error) {
			const err = deleteArticleResult?.error as ActionErrorType

			// if unauthorized
			if (err?.status === 403) {
				toast.error(err.message)
			}

			Object.entries(err.errors || {})?.forEach(item => toast.error(`${item[0]} ${item[1]}`))
		}
	}, [deleteArticleResult])

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
					<Button fullWidth onClick={handleShowDeleteConfirmation(slug)} className={classes['action-button']} variant='dark'>
						Delete
					</Button>
				</DropdownButton>
			)
		}
	]
	// TODO: pagination props most fetched from api NOT HARDCODED

	// TODO: create modal component
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

			<Modal show={showDeleteConfirmation} onHide={handleCloseDeleteConfirmation}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Article</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure to delete Article?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='light' className='border bg-white' onClick={handleCloseDeleteConfirmation}>
						<span className='text-dark'>No</span>
					</Button>
					<Button loading={deleteArticleResult.isLoading} disabled={deleteArticleResult.isLoading} variant='danger' onClick={handleDeleteArticle}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Articles
