import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from 'constants/routes'
import { Container } from 'react-bootstrap'

interface HomeProps {}

const Home: FC<HomeProps> = () => {
	return (
		<Container>
			<p>Home Page</p>
			<Link to={LOGIN_ROUTE}>Login</Link>
			<br />
			<Link to={DASHBOARD_ROUTE}>Dashboard</Link>
		</Container>
	)
}

export default Home
