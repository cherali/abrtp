import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import BButton, { ButtonProps as BButtonProps } from 'react-bootstrap/Button'

import classes from './button.styles.module.scss'
import Loading from 'components/Loading'

interface ButtonProps extends BButtonProps {
	children: ReactNode
	fullWidth?: boolean
	loading?: boolean
}

const Button: FC<ButtonProps> = ({ children, className, fullWidth = false, loading = false, disabled = false, ...rest }) => {
	return (
		<BButton className={clsx(classes.button, fullWidth && 'w-100', className)} disabled={disabled || loading} {...rest}>
			{loading ? <Loading role='button' size='sm' as='span' variant='light' /> : children}
		</BButton>
	)
}

export default Button
