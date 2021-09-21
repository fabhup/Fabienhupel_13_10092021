import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../../features/authentication'
import { Provider } from 'react-redux'

//This module is used for tests to render components with Redux State

export function render(ui, options) {
    
    const store = configureStore({
        reducer: {
            authentication: authenticationReducer,
        },
    })

    function Wrapper({ children }) {
        return (
            <MemoryRouter {...options}>
                <Provider store={store}>{children}</Provider>
            </MemoryRouter>
        )
    }
    rtlRender(ui, { wrapper: Wrapper })
}