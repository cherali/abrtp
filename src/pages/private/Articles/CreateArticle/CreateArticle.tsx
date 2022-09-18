import { FC, useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import * as Yup from 'yup'
import { Formik, Form, FormikProps } from 'formik'
import { Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Input from 'components/Input'
import Button from 'components/Button'
import Loading from 'components/Loading'
import Checkbox from 'components/Checkbox'
import { uniqueArray } from 'utils/array'
import { ActionErrorType } from 'utils/apiUtil'
import { CreateArticleParams, useCreateArtileMutation, useGetTagListQuery } from '../Articles.services'

type SetFieldValueFn = (field: string, value: Array<string>, shouldValidate?: boolean | undefined) => void

const CreateArticle: FC = () => {
	const { data: tags, isFetching: isFetchingTags } = useGetTagListQuery('')
	const [newTag, setNewTag] = useState('')
	const [userDefiendTag, setUserDefiendTag] = useState<Array<string>>([])
	const formRef = useRef<FormikProps<CreateArticleParams>>(null)

	const [createArticle, createArticleResult] = useCreateArtileMutation()

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Required Field'),
		description: Yup.string().required('Required Field'),
		body: Yup.string().required('Required Field')
	})

	const initialValues: CreateArticleParams = {
		title: '',
		description: '',
		body: '',
		tagList: []
	}

	const onSubmit = (values: CreateArticleParams) => {
		createArticle(values)
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

	useEffect(() => {
		// if success
		if (createArticleResult.isSuccess) {
			// show toaster
			toast.success('Article Craated succesfully')

			// clear form
			formRef.current?.resetForm()
		}

		// if errors
		else if (createArticleResult.error) {
			const errors = (createArticleResult?.error as ActionErrorType).errors

			Object.entries(errors || {})?.forEach(item => toast.error(`${item[0]} ${item[1]}`))
		}
	}, [createArticleResult])

	return (
		<Container fluid>
			<h1 className='mx-n3'>New Article</h1>
			<Formik innerRef={formRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{({ values, setFieldValue }) => (
					<Row className='mt-3 gap-lg-4 gap-md-3 flex-md-nowrap flex-sm-wrap'>
						<Col className='p-0' xl={9} lg={8} md={7} sm={12}>
							<Form>
								<Input label='Title' name='title' type='text' />
								<Input label='Description' name='description' type='text' />
								<Input label='Body' name='body' as='textarea' rows={8} noPlaceholder />
								<div className='mt-md-4 submit-button-wrapper'>
									<Button loading={isFetchingTags || createArticleResult.isLoading} type='submit'>
										Submit
									</Button>
								</div>
							</Form>
						</Col>
						<Col className='p-0 margin-fix' xl={3} lg={4} md={5} sm={12}>
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

									<div className='border border-1 rounded-1 p-3 tag-container'>
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
		</Container>
	)
}

export default CreateArticle
