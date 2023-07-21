import { configureStore } from '@reduxjs/toolkit'
import { inheritanceReducer } from './inheritance'

export const store = configureStore({
	reducer: {
		inheritance: inheritanceReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
