import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { BaseQueryFn } from '@reduxjs/toolkit/query'

interface QueryProps {
	url: string
	method: AxiosRequestConfig['method']
	data?: AxiosRequestConfig['data']
	useAuth?: boolean
	headers?: AxiosRequestHeaders
}

interface AxiosBaseQueryError {
	errors?: object
	status?: number
}

export interface ActionErrorType {
	errors?: object
}

export const axiosBaseQuery =
	({ baseUrl }: { baseUrl?: string } = { baseUrl: '' }): BaseQueryFn<QueryProps, unknown, AxiosBaseQueryError> =>
	async ({ url, method, data, useAuth = false, headers = {} }) => {
		try {
			if (useAuth) {
				const { user } = JSON.parse(localStorage.getItem('data') || '{"user":{}}')
				if (user.token) {
					headers['Authorization'] = `Token ${user.token}`
				}
			}

			const result = await axios({ url: baseUrl + url, method, data, headers })

			return {
				data: result.data
			}
		} catch (axiosError) {
			const err = axiosError as AxiosError
			return {
				error: {
					status: err.response?.status,
					...(err.response?.data || {})
				}
			}
		}
	}
