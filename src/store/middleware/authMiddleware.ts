import { Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// first input is state but deleted due not use it
export const authMiddleware: Middleware<object, unknown> = () => next => action => {
	const payload = action.payload

	if (payload?.status === 'error' && payload?.message === 'missing authorization credentials') {
		toast.error('missing authorization credentials')
	}

	next(action)
}
