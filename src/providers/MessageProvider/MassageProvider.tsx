import type { FC } from 'react'
import clsx from 'clsx'
import { ToastContainer, ToastOptions, toast, ToastClassName } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import classes from './messageProvider.styles.module.scss'

interface MessageProviderProps {}

const contextClass: Record<string, string> = {
	success: classes['message-success'],
	error: classes['message-error'],
	info: classes['message-info'],
	warning: classes['message-warning'],
	default: classes['message-default'],
	dark: classes['message-dark']
}

export const defaultOption: ToastOptions = {
	position: toast.POSITION.TOP_RIGHT,
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: 'colored'
}

const MessageProvider: FC<MessageProviderProps> = () => {
	const cls: ToastClassName = context =>
		clsx(
			contextClass[context?.type || 'default'],
			classes['toast-container'],
			'position-relative d-flex mb-2 p-2 justify-content-between overflow-hidden cursor-pointer'
		)
	return <ToastContainer toastClassName={cls} bodyClassName={classes['toast-body']} icon={false} {...defaultOption} />
}

export default MessageProvider
