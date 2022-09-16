import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { LOGIN_ROUTE } from 'constants/routes'

interface IPrivateRouteProps {}

const PrivateRoute: FC<IPrivateRouteProps> = () => {
	// TODO: get login status based on token
	const isLogin = false

	return isLogin ? <Outlet /> : <Navigate replace to={LOGIN_ROUTE} />
}

export default PrivateRoute
