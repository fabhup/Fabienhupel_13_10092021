import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../features/authentication'
import profileReducer from '../features/profile'

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        profile: profileReducer,
    },
})

export default store
