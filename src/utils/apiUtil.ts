import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { BaseQueryFn } from '@reduxjs/toolkit/query'

interface QueryProps {
	url: string
	method: AxiosRequestConfig['method']
	data?: AxiosRequestConfig['data']
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
	async ({ url, method, data }) => {
		try {
			const result = await axios({ url: baseUrl + url, method, data })

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
