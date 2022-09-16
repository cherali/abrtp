import type { FC } from 'react'
import Spinner, { SpinnerProps } from 'react-bootstrap/Spinner'

interface LoadingProps extends Omit<SpinnerProps, 'animation'> {
	animation?: 'border' | 'grow'
}

const Loading: FC<LoadingProps> = ({ animation = 'border', variant = 'primary', ...rest }) => {
	return <Spinner animation={animation} variant={variant} {...rest} />
}

export default Loading
