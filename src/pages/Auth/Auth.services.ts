import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'utils/apiUtil'
import { loginUrl, registerUrl } from 'constants/urls'

interface User {
	email: string
	username: string
	bio: string
	image: string
	token: string
}

export interface LoginUserData {
	email: string
	password: string
}

export interface RegisterUserData {
	username: string
	email: string
	password: string
}

interface LoginUserResult {
	user: User
}

interface RegisterUserResult {
	user: User
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
		}),
		registerUser: build.mutation<RegisterUserResult, RegisterUserData>({
			query: data => ({
				url: registerUrl,
				method: 'POST',
				data: {
					user: data
				}
			})
		})
	})
})

export const { useLoginUserMutation, useRegisterUserMutation } = usersApi
