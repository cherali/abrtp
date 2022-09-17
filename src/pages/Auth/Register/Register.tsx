import { FC, useEffect } from 'react'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Content from 'components/Content'
import Input from 'components/Input'
import Button from 'components/Button'
import { LOGIN_ROUTE } from 'constants/routes'
import { ActionErrorType } from 'utils/apiUtil'
import { RegisterUserData, useRegisterUserMutation } from '../Auth.services'

import classes from './register.styles.module.scss'

const Register: FC = () => {
	const [registerUser, registerUserResult] = useRegisterUserMutation()
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Required Field'),
		email: Yup.string().email('Invalid email').required('Required Field'),
		password: Yup.string().required('Required Field')
	})

	const initialValues: RegisterUserData = {
		username: '',
		email: '',
		password: ''
	}

	const onSubmit = (values: RegisterUserData) => {
		registerUser(values)
	}

	useEffect(() => {
		// if register success
		if (registerUserResult.isSuccess) {
			// 1. dismiss all active toaster
			toast.dismiss()

			// 2. show success toast for 3sec
			toast.success('Register Successfull', { autoClose: 3000 })

			// 3. redirect to login
			navigate(LOGIN_ROUTE)
		}

		// if register failed show all error messages: toaster
		if (registerUserResult.error) {
			const errors = (registerUserResult?.error as ActionErrorType).errors

			Object.entries(errors || {})?.forEach(item =>
				toast.error(`${item[0]} ${item[1]}`, {
					bodyClassName: classes['error-prefix']
				})
			)
		}
	}, [registerUserResult])

	return (
		<Container className={clsx(classes.wrapper, 'd-flex justify-content-center p-0 align-items-xs-start align-items-md-center')}>
			<Content addSpacing lg={4} md={9} xs={12}>
				<h1 className={classes.title}>Register</h1>
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
					<Form>
						<Input label='Username' name='username' type='text' noPlaceholder />
						<Input label='Email' name='email' type='email' noPlaceholder />
						<Input label='PassWord' name='password' type='password' noPlaceholder />
						<div className='mt-4'>
							<Button loading={registerUserResult.isLoading} type='submit' fullWidth>
								Register
							</Button>
						</div>
					</Form>
				</Formik>

				<div className='d-flex gap-2 mt-3 align-items-center'>
					<p className='mb-0'>Already Registered?</p>
					<Link className={classes.login} to={LOGIN_ROUTE}>
						Login
					</Link>
				</div>
			</Content>
		</Container>
	)
}

export default Register
