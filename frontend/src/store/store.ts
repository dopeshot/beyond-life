import { configureStore } from '@reduxjs/toolkit'
import { lastWillReducer } from './lastwill'

export const store = configureStore({
	reducer: {
		lastWill: lastWillReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
