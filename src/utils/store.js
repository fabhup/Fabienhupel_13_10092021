import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../features/authentication'

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
    },
})

export default store
