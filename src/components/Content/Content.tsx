import type { FC, ReactNode } from 'react'
import clsx from 'clsx'
import Col, { ColProps } from 'react-bootstrap/Col'

import classes from './content.styles.module.scss'

interface ContentProps extends ColProps {
	children: ReactNode
	centerText?: boolean
	addSpacing?: boolean
}

const Content: FC<ContentProps> = ({ children, className, addSpacing = false, centerText = false, ...rest }) => {
	return (
		<Col className={clsx(classes.content, centerText && classes['text-center'], addSpacing && classes.spacing, className)} {...rest}>
			{children}
		</Col>
	)
}

export default Content
