import { ReactNode, FormEventHandler, useState } from 'react'
import BForm from 'react-bootstrap/Form'

interface FormProps<T extends object> {
	children: ReactNode
	onSubmit?: (values: T) => void
}

const Form = <T extends object>({ children, onSubmit }: FormProps<T>) => {
	const [validated, setValidated] = useState(false)

	const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
		event.stopPropagation()
		event.preventDefault()

		const form = event.currentTarget
		if (form.checkValidity() === false) {
			return setValidated(true)
		}

		const values = Object.assign({})

		Array.from(event.currentTarget.elements).forEach(element => {
			if (element instanceof HTMLInputElement) {
				const fieldname: string = element.dataset.name as string

				values[fieldname] = element.value
			}
		})

		onSubmit && onSubmit(values)
	}

	return (
		<BForm noValidate validated={validated} onSubmit={handleSubmit}>
			{children}
		</BForm>
	)
}

export default Form
