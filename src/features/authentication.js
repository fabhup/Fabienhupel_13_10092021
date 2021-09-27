import { createSlice } from '@reduxjs/toolkit'
import { selectAuthentication } from '../utils/selectors'
import { apiUrl } from '../utils/config/config'
import axios from 'axios'

let userLoggedIn = JSON.parse(localStorage.getItem('user_loggedIn'))

const resetState = {
    status: 'void',
    error: null,
    username: null,
    token: null,
}

const initialState = userLoggedIn
    ? {
          status: 'success',
          error: null,
          username: userLoggedIn.username,
          token: userLoggedIn.token,
      }
    : resetState

export function login(username, password, remember) {
    return async (dispatch, getState) => {
        const status = selectAuthentication(getState()).status
        if (status === 'running') {
            return
        }
        dispatch(actions.loginRunning(username))

        // Add a sleep delay to show loadSpinner before axios call
        await new Promise((r) => setTimeout(r, 500))

        try {
            const response = await axios.post(
                apiUrl + `/user/login`,
                {
                    email: username,
                    password: password,
                },
                { timeout: 5000 }
            )
            const data = response.data
            dispatch(actions.loginSuccess({ username: username, data: data }))

            // if the user has checked remember option on loginForm, informations are stored in localstorage to prevent logout on refresh
            if (remember) {
                localStorage.setItem(
                    'user_loggedIn',
                    JSON.stringify({
                        username: username,
                        token: data.body.token,
                    })
                )
            }
        } catch (error) {
            try {
                const errorMessage = error.response.data.message
                dispatch(
                    actions.loginFailed({
                        username: username,
                        error: errorMessage,
                    })
                )
            } catch {
                dispatch(
                    actions.loginFailed({
                        username: username,
                        error: 'Error: Backend is not active',
                    })
                )
            }
        }
    }
}

export function logout() {
    return async (dispatch, getState) => {
        dispatch(actions.logout())
        localStorage.removeItem('user_loggedIn')
        localStorage.removeItem('user_profile')
    }
}

const { actions, reducer } = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        loginRunning: (draft, action) => {
            if (draft.status === 'void' || draft.status === 'success') {
                draft.username = action.payload
                draft.status = 'running'
                return
            }
            if (draft.status === 'failed') {
                draft.username = action.payload
                draft.error = null
                draft.status = 'running'
                return
            }
            return
        },
        loginSuccess: (draft, action) => {
            if (draft.status === 'running') {
                draft.username = action.payload.username
                draft.token = action.payload.data.body.token
                draft.status = 'success'
                return
            }
            return
        },
        loginFailed: (draft, action) => {
            if (draft.status === 'running') {
                draft.username = action.payload.username
                draft.error = action.payload.error
                draft.status = 'failed'
                return
            }
            return
        },
        logout: () => resetState,
    },
})

export const { loginRunning, loginFailed, loginSuccess } = actions

export default reducer
