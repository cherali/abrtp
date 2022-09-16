import { usersApi } from './../pages/Auth/Auth.services'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(usersApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
