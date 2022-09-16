import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Container } from 'react-bootstrap'
import Button from 'components/Button'
import Content from 'components/Content'
import Form from 'components/Form'
import Input from 'components/Input'
import { DASHBOARD_ROUTE, REGISTER_ROUTE } from 'constants/routes'
import { ActionErrorType } from 'utils/apiUtil'
import { LoginUserData, useLoginUserMutation } from '../Auth.services'

import classes from './login.styles.module.scss'

const Login: FC = () => {
	const [loginUser, loginUserResult] = useLoginUserMutation()
	const navigate = useNavigate()

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
		<Container className={classes.wrapper}>
			<Content addSpacing lg={4}>
				<h1 className={classes.title}>Login</h1>
				<Form onSubmit={onSubmit}>
					<Input type='email' name='email' label='Email' noPlaceholder />
					<Input type='password' name='password' label='Password' noPlaceholder required inValidText='Required field' autoComplete='on' />
					<div>
						<Button loading={loginUserResult.isLoading} type='submit' fullWidth>
							Login
						</Button>
					</div>
				</Form>
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
