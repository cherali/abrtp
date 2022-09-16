import type { FC } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useUser } from 'hooks/useUser'
import Button from 'components/Button'

const DefaultHeader: FC = () => {
	const user = useUser()

	return (
		<Navbar bg='dark' variant='dark' expand='md' className='px-3 py-3' sticky='top'>
			<Container fluid className='px-1'>
				<NavbarBrand className='text-white'>Arvan Challenge</NavbarBrand>

				<Navbar.Toggle aria-controls='navbarScroll' />

				<Navbar.Collapse in={false}>
					<Navbar.Text className='text-white'>Wellcome {user.username}</Navbar.Text>
				</Navbar.Collapse>

				<Navbar.Offcanvas id='navbarScroll' aria-labelledby='offcanvasNavbarLabel-expand-md' placement='end'>
					<Offcanvas.Header className='bg-dark' closeButton closeVariant='white'>
						<Offcanvas.Title className='text-white' id='offcanvasNavbarLabel-expand-md'>
							Arvan Challenge
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className='justify-content-end flex-grow-1'>
							<h6 className='mb-3'>Wellcome {user.username}</h6>

							<Button variant='outline-primary'>Logout</Button>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default DefaultHeader
