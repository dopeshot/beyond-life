import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth'
import { lastWillReducer } from './lastwill/lastwill'

export const store = configureStore({
	reducer: {
		lastWill: lastWillReducer,
		auth: authReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
