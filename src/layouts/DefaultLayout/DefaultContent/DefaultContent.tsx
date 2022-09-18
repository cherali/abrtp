import type { FC, ReactNode } from 'react'

import classes from './defaultContent.styles.module.scss'

interface DefaultContentProps {
	children: ReactNode
}

const DefaultContent: FC<DefaultContentProps> = ({ children }) => {
	return <div className={classes.content}>{children}</div>
}

export default DefaultContent
