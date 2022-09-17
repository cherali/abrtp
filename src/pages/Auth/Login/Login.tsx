import { FC, useEffect } from 'react'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container } from 'react-bootstrap'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Button from 'components/Button'
import Content from 'components/Content'
import Input from 'components/Input'
import { DASHBOARD_ROUTE, REGISTER_ROUTE } from 'constants/routes'
import { ActionErrorType } from 'utils/apiUtil'
import { LoginUserData, useLoginUserMutation } from '../Auth.services'

import classes from './login.styles.module.scss'

const Login: FC = () => {
	const [loginUser, loginUserResult] = useLoginUserMutation()
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required Field'),
		password: Yup.string().required('Required Field')
	})

	const initialValues: LoginUserData = {
		email: '',
		password: ''
	}

	const onSubmit = (values: LoginUserData) => {
		loginUser(values)
	}

	useEffect(() => {
		// if login success
		if (loginUserResult.isSuccess) {
			// 1. dismiss all active toaster
			toast.dismiss()

			// 2. show success toast for 3sec
			toast.success('Login Successfull', { autoClose: 3000 })

			// 3. save user in localStorage
			// token most be save in cookies with httpOnly flag
			// but react cant do that so for now just save user object in local storage
			// ATTENTION: By saving token directly in localStorage, we can't set expiration date for revoking token
			localStorage.setItem('data', JSON.stringify({ user: loginUserResult.data.user }))

			// redirect to dashboard
			navigate(DASHBOARD_ROUTE)
		}

		// if login failed show all error messages: toaster
		if (loginUserResult.error) {
			const errors = (loginUserResult?.error as ActionErrorType).errors

			Object.entries(errors || {})?.map(item =>
				toast.error(`${item[0]} ${item[1]}`, {
					bodyClassName: classes['error-prefix']
				})
			)
		}
	}, [loginUserResult])

	return (
		<Container className={clsx(classes.wrapper, 'd-flex justify-content-center p-0 align-items-xs-start align-items-md-center')}>
			<Content addSpacing lg={4} md={9} xs={12}>
				<h1 className={classes.title}>Login</h1>

				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
					<Form>
						<Input label='Email' name='email' type='email' noPlaceholder />
						<Input label='PassWord' name='password' type='password' noPlaceholder />
						<div className='mt-4'>
							<Button loading={loginUserResult.isLoading} type='submit' fullWidth>
								Login
							</Button>
						</div>
					</Form>
				</Formik>

				<div className='d-flex gap-2 mt-3 align-items-center'>
					<p className='mb-0'>{`Don't have account? `}</p>
					<Link className={classes.register} to={REGISTER_ROUTE}>
						Register Now
					</Link>
				</div>
			</Content>
		</Container>
	)
}

export default Login
