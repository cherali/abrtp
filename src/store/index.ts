import { articlesApi } from 'pages/private/Articles/Articles.services'
import { usersApi } from 'pages/Auth/Auth.services'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authMiddleware } from './middleware/authMiddleware'

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		[articlesApi.reducerPath]: articlesApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware, usersApi.middleware, articlesApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
