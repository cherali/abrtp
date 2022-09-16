import { FC, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from 'hooks/useUser'
import { LOGIN_ROUTE } from 'constants/routes'
import Loading from 'components/Loading'
import DefaultLayout from 'layouts/DefaultLayout'

interface IPrivateRouteProps {}

const PrivateRoute: FC<IPrivateRouteProps> = () => {
	const user = useUser()
	const isLogin = Boolean(user?.token) || false

	return isLogin ? (
		<DefaultLayout>
			<Suspense fallback={<Loading />}>
				<Outlet />
			</Suspense>
		</DefaultLayout>
	) : (
		<Navigate replace to={LOGIN_ROUTE} />
	)
}

export default PrivateRoute
