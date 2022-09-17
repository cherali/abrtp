import type { FC } from 'react'
import { useField } from 'formik'
import Form from 'react-bootstrap/Form'

interface InputProps {
	type?: string
	wrapperClassName?: string
	label: string
	helperText?: string
	placeholder?: string
	disabled?: boolean
	hiddenLable?: boolean
	column?: boolean | 'sm' | 'lg'
	noPlaceholder?: boolean
	autoComplete?: string
	name: string
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
	autoComplete = false,
	name
}) => {
	const [field, meta] = useField(name)

	const isValid = !meta.error
	const isInvalid = meta.touched && !isValid

	return (
		<Form.Group className={wrapperClassName}>
			<Form.Group>
				<Form.Label visuallyHidden={hiddenLable} column={column}>
					{label}
				</Form.Label>
				<Form.Control
					{...field}
					type={type}
					isValid={meta.touched && isValid}
					isInvalid={isInvalid}
					disabled={disabled}
					autoComplete={autoComplete.toString()}
					placeholder={noPlaceholder ? '' : placeholder || label}
				/>
				{Boolean(helperText) && <Form.Text className='text-muted'>{helperText}</Form.Text>}
				{meta.touched && <Form.Control.Feedback type='invalid'>{meta.error}</Form.Control.Feedback>}
			</Form.Group>
		</Form.Group>
	)
}

export default Input
