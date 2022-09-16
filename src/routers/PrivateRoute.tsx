import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { LOGIN_ROUTE } from 'constants/routes'

interface IPrivateRouteProps {}

const PrivateRoute: FC<IPrivateRouteProps> = () => {
	const { user } = JSON.parse(localStorage.getItem('data') || '{"user":{}}')
	const isLogin = Boolean(user.token) || false

	return isLogin ? <Outlet /> : <Navigate replace to={LOGIN_ROUTE} />
}

export default PrivateRoute
