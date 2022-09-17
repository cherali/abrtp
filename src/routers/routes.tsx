import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import {
	ARTICLES_ROUTE,
	ARTICLES_ROUTE_QUERY,
	CREATE_ARTICLE_ROUTE,
	DASHBOARD_ROUTE,
	HOME_ROUTE,
	LOGIN_ROUTE,
	NOT_FOUND_ROUTE,
	REGISTER_ROUTE
} from 'constants/routes'

import PrivateRoute from './PrivateRoute'

const HomePage = lazy(() => import('pages/public/Home'))
const NotFoundPage = lazy(() => import('pages/NotFound'))
const LoginPage = lazy(() => import('pages/Auth/Login'))
const RegisterPage = lazy(() => import('pages/Auth/Register'))

const DashboardPage = lazy(() => import('pages/private/Dashboard'))
const ArticlesPage = lazy(() => import('pages/private/Articles'))
const CreateArticlePage = lazy(() => import('pages/private/Articles/CreateArticle'))

export const Routes = () =>
	useRoutes([
		{
			path: HOME_ROUTE,
			element: <HomePage />
		},
		{
			path: LOGIN_ROUTE,
			element: <LoginPage />
		},
		{
			path: REGISTER_ROUTE,
			element: <RegisterPage />
		},
		{
			path: '/',
			element: <PrivateRoute />,
			children: [
				{
					path: DASHBOARD_ROUTE,
					element: <DashboardPage />
				},
				{
					path: ARTICLES_ROUTE,
					children: [
						{
							path: '',
							element: <ArticlesPage />
						},
						{
							path: ARTICLES_ROUTE_QUERY,
							element: <ArticlesPage />
						}
					]
				},
				{
					path: CREATE_ARTICLE_ROUTE,
					element: <CreateArticlePage />
				}
			]
		},

		{
			path: NOT_FOUND_ROUTE,
			element: <NotFoundPage />
		}
	])
