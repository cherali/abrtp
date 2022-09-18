import { FC, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import NavItem from 'react-bootstrap/NavItem'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useUser } from 'hooks/useUser'
import Button from 'components/Button'
import { HOME_ROUTE } from 'constants/routes'
import type { SidebarLinkItem } from '../DefaultLayout'

interface DefaultHeader {
	sidebarLinks: Array<SidebarLinkItem>
}

const DefaultHeader: FC<DefaultHeader> = ({ sidebarLinks }) => {
	const user = useUser()
	const menuRef = useRef<HTMLButtonElement>(null)
	const location = useLocation()

	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('data')

		setTimeout(() => {
			navigate(HOME_ROUTE)
		})
	}

	useEffect(() => {
		if (!menuRef.current?.classList.contains('collapsed')) {
			menuRef.current?.click()
		}
	}, [location.pathname])

	return (
		<Navbar bg='dark' variant='dark' expand='md' className='px-3 py-3' sticky='top'>
			<Container fluid className='px-1'>
				<NavbarBrand className='text-white'>Arvan Challenge</NavbarBrand>

				<Navbar.Toggle ref={menuRef} aria-controls='navbarScroll' />

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

							<div className='d-md-none'>
								<hr className='mb-3 border-info' />
								<div>
									<h5>Posts</h5>
									<div>
										<Nav className='mx-n3 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'>
											{sidebarLinks.map((item, index) => (
												<NavItem
													key={index}
													className={clsx(
														'py-2 w-100 px-2',
														(location.pathname === item.linkTo ||
															(item.checkInclude && item.checkInclude.some(link => location.pathname.includes(`${item.linkTo}/${link}`)))) &&
															'bg-info'
													)}
												>
													<Link to={item.linkTo} className='w-100 d-inline-block text-black align-middle px-4'>
														{item.text}
													</Link>
												</NavItem>
											))}
										</Nav>
									</div>
								</div>

								<hr className='mb-3 border-info' />
							</div>
							<Button variant='outline-primary' onClick={handleLogout}>
								Logout
							</Button>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default DefaultHeader
