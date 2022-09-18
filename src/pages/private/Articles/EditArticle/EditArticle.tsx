import { FC, useState, ChangeEvent, KeyboardEvent, useEffect, useMemo } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Input from 'components/Input'
import Button from 'components/Button'
import Loading from 'components/Loading'
import Checkbox from 'components/Checkbox'
import { uniqueArray } from 'utils/array'
import { ActionErrorType } from 'utils/apiUtil'
import { ARTICLES_ROUTE } from 'constants/routes'
import { EditArticleParams, useEditArtileMutation, useGetAnArtileQuery, useGetTagListQuery } from '../Articles.services'

import classes from './editArticle.styles.module.scss'

type SetFieldValueFn = (field: string, value: Array<string>, shouldValidate?: boolean | undefined) => void

interface UrlParams {
	slug?: string
}

const EditArticle: FC = () => {
	const { slug } = useParams<Record<keyof UrlParams, string>>()
	const [newTag, setNewTag] = useState('')
	const [userDefiendTag, setUserDefiendTag] = useState<Array<string>>([])
	const navigate = useNavigate()

	const {
		data: currentAricle,
		isFetching: isFetchingCurrentAricle,
		isError: isErrorCurrentArticle,
		error: currentArticleError
	} = useGetAnArtileQuery({ slug: slug || '*' })

	const { data: tags, isFetching: isFetchingTags } = useGetTagListQuery('')

	const [editArticle, editArticleResult] = useEditArtileMutation()

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Required Field'),
		description: Yup.string().required('Required Field'),
		body: Yup.string().required('Required Field')
	})

	const initialValues: EditArticleParams = useMemo(
		() => ({
			title: currentAricle?.title || '',
			description: currentAricle?.description || '',
			body: currentAricle?.body || '',
			tagList: currentAricle?.tagList || [],
			slug: currentAricle?.slug || ''
		}),
		[currentAricle]
	)

	const onSubmit = (values: EditArticleParams) => {
		editArticle(values)
	}

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => setNewTag(evt.target.value)

	const handleAddTagByUser = (setFieldValue: SetFieldValueFn, tagList: Array<string>) => (evt: KeyboardEvent<HTMLInputElement>) => {
		// if enter released save tag localy
		if (evt.key === 'Enter') {
			// if empty
			if (!newTag) {
				return toast.warn("Tag can't be empty", { autoClose: 1000 })
			}
			// if tag not exist
			else if (!tags?.includes(newTag) && !userDefiendTag.includes(newTag)) {
				setUserDefiendTag(s => [...s, newTag])

				// update form
				setFieldValue('tagList', [...tagList, newTag])

				// clear tag field
				return setNewTag('')
			}

			// show toast: tag exist
			toast.warn('Tag already exist!', { autoClose: 1000 })
		}
	}

	const handleChangeTagList = (setFieldValue: SetFieldValueFn, tagList: Array<string>) => (evt: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = evt.target

		const newTagList = !checked ? tagList.filter(f => f !== name) : [...tagList, name]

		// change form value
		setFieldValue('tagList', newTagList)
	}

	const getErrors = (): Array<string> => {
		const errors = (currentArticleError as ActionErrorType).errors

		return Object.entries(errors || {})
			.map(item => item[1].map((err: string) => `${item[0]} ${err}`))
			.flat()
	}

	useEffect(() => {
		// if success
		if (editArticleResult.isSuccess) {
			// show toaster
			toast.success('Article updated successfuly', {
				bodyClassName: classes['update-prefix']
			})

			// navigate to article page
			navigate(ARTICLES_ROUTE)
		}
		// if errors
		else if (editArticleResult.error) {
			const err = editArticleResult?.error as ActionErrorType

			// if unauthorized
			if (err?.status === 403) {
				toast.error(err.message)
			}

			Object.entries(err.errors || {})?.forEach(item => toast.error(`${item[0]} ${item[1]}`))
		}
	}, [editArticleResult])

	return (
		<Container fluid>
			<h1>Edit Article</h1>
			{isFetchingCurrentAricle && <Loading />}
			{!isFetchingCurrentAricle && isErrorCurrentArticle && (
				<div>
					{getErrors().map((err, index) => (
						<Alert key={index} variant='danger'>
							<h5 className='mb-0'>{err}</h5>
						</Alert>
					))}
				</div>
			)}
			{!isFetchingCurrentAricle && !isErrorCurrentArticle && (
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
					{({ values, setFieldValue }) => (
						<Row className='mt-3 gap-3 flex-nowrap'>
							<Col xl={9}>
								<Form>
									<Input label='Title' name='title' type='text' />
									<Input label='Description' name='description' type='text' />
									<Input label='Body' name='body' as='textarea' rows={8} noPlaceholder />
									<div className='mt-4'>
										<Button loading={isFetchingTags || editArticleResult.isLoading} type='submit'>
											Submit
										</Button>
									</div>
								</Form>
							</Col>
							<Col xl={3}>
								{isFetchingTags && <Loading />}
								{!isFetchingTags && (
									<div>
										<Input
											onKeyUp={handleAddTagByUser(setFieldValue, values.tagList)}
											isValid={false}
											value={newTag}
											onChange={handleChange}
											name='tag'
											label='Tags'
											placeholder='New Tag'
										/>

										<div className='border border-1 rounded-1 p-3'>
											{[...(tags || []), ...userDefiendTag]
												.filter(uniqueArray<string>)
												.sort((a, b) => a.localeCompare(b))
												.map(tag => (
													<Checkbox
														name={tag}
														key={tag}
														label={tag}
														onChange={handleChangeTagList(setFieldValue, values.tagList)}
														defaultChecked={userDefiendTag.includes(tag) || values.tagList.includes(tag)}
													/>
												))}
										</div>
									</div>
								)}
							</Col>
						</Row>
					)}
				</Formik>
			)}
		</Container>
	)
}

export default EditArticle
