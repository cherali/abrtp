import type { FC, ReactNode } from 'react'
import Container from 'react-bootstrap/Container'
import { ARTICLES_ROUTE, CREATE_ARTICLE_ROUTE, DASHBOARD_ROUTE } from 'constants/routes'
import DefaultContent from './DefaultContent'
import DefaultHeader from './DefaultHeader'
import DefaultSideNav from './DefaultSideNav'

interface DefaultLayoutProps {
	children: ReactNode
}

export interface SidebarLinkItem {
	text: string
	linkTo: string
	checkInclude?: Array<string>
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	const sidebarTitle = 'Post'

	const sidebarLinks: Array<SidebarLinkItem> = [
		{ text: 'Dashboard', linkTo: DASHBOARD_ROUTE },
		{ text: 'All Articles', linkTo: ARTICLES_ROUTE, checkInclude: ['page'] },
		{ text: 'New Article', linkTo: CREATE_ARTICLE_ROUTE }
	]
	return (
		<div>
			<DefaultHeader sidebarLinks={sidebarLinks} />

			<Container fluid className='p-0'>
				<div>
					<DefaultSideNav sidebarTitle={sidebarTitle} sidebarLinks={sidebarLinks} />
					<DefaultContent>{children}</DefaultContent>
				</div>
			</Container>
		</div>
	)
}

export default DefaultLayout
