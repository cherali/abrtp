import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'utils/apiUtil'
import { loginUrl } from 'constants/urls'

export interface LoginUserData {
	email: string
	password: string
}

interface LoginUserResult {
	user: {
		email: string
		username: string
		bio: string
		image: string
		token: string
	}
}

export const usersApi = createApi({
	reducerPath: 'users',
	baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
	keepUnusedDataFor: 0,
	endpoints: build => ({
		loginUser: build.mutation<LoginUserResult, LoginUserData>({
			query: data => ({
				url: loginUrl,
				method: 'POST',
				data: {
					user: data
				}
			}),
			transformResponse(response: LoginUserResult) {
				return response
			}
		})
	})
})

export const { useLoginUserMutation } = usersApi
