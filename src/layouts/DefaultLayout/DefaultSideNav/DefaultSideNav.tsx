import type { FC } from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { Col, Nav, NavItem } from 'react-bootstrap'
import { SidebarLinkItem } from '../DefaultLayout'

import classes from './defaultSideNav.styles.module.scss'

interface DefaultSideNavProps {
	sidebarTitle: string
	sidebarLinks: Array<SidebarLinkItem>
}

const DefaultSideNav: FC<DefaultSideNavProps> = ({ sidebarLinks, sidebarTitle }) => {
	const location = useLocation()

	return (
		<div className={classes['side-nav']}>
			<Col className=''>
				<div className='px-3 py-2'>
					<span className='px-2 my-1'>{sidebarTitle}</span>
				</div>

				<Nav className='flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'>
					{sidebarLinks.map((item, index) => (
						<NavItem
							key={index}
							className={clsx(
								'py-2 w-100 px-2',
								(location.pathname === item.linkTo || (item.checkInclude && location.pathname.includes(item.linkTo))) && classes.active
							)}
						>
							<Link to={item.linkTo} className='w-100 d-inline-block align-middle px-4'>
								{item.text}
							</Link>
						</NavItem>
					))}
				</Nav>
			</Col>
		</div>
	)
}

export default DefaultSideNav
