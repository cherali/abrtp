import type { FC } from 'react'
import { Form, FormCheckProps } from 'react-bootstrap'

interface CheckboxProps extends FormCheckProps {
	parentClassName?: string
	label: string
}

const Checkbox: FC<CheckboxProps> = ({ parentClassName = 'mb-3', label, ...rest }) => {
	return (
		<Form.Group className={parentClassName}>
			<Form.Check type='checkbox' label={label} {...rest} />
		</Form.Group>
	)
}

export default Checkbox
