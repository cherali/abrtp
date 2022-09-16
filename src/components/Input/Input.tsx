import type { FC, HTMLInputTypeAttribute } from 'react'
import Form from 'react-bootstrap/Form'
import type { FormControlProps } from 'react-bootstrap/FormControl'

interface InputProps extends FormControlProps {
	type?: HTMLInputTypeAttribute
	wrapperClassName?: string
	label: string
	helperText?: string
	placeholder?: string
	disabled?: boolean
	hiddenLable?: boolean
	column?: boolean | 'sm' | 'lg'
	noPlaceholder?: boolean
	required?: boolean
	inValidText?: string
	name: string
	autoComplete?: string
}

const Input: FC<InputProps> = ({
	wrapperClassName = 'mb-3',
	label,
	type = 'input',
	placeholder,
	helperText,
	disabled = false,
	hiddenLable = false,
	column = false,
	noPlaceholder = false,
	inValidText = '',
	name,
	...rest
}) => {
	return (
		<Form.Group className={wrapperClassName}>
			<Form.Label visuallyHidden={hiddenLable} column={column}>
				{label}
			</Form.Label>
			<Form.Control data-name={name} disabled={disabled} type={type} placeholder={noPlaceholder ? '' : placeholder || label} {...rest} />
			{Boolean(helperText) && <Form.Text className='text-muted'>{helperText}</Form.Text>}
			<Form.Control.Feedback type='invalid'>{inValidText}</Form.Control.Feedback>
		</Form.Group>
	)
}

export default Input
