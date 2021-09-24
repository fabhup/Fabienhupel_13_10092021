import { createSlice } from '@reduxjs/toolkit'
import { selectProfile } from '../utils/selectors'
import { apiUrl } from '../utils/config/config'
import axios from 'axios'

const initialState = {
    status: 'void',
    error: null,
    user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
    },
    editedProfile: {
        firstName: null,
        lastName: null,
        status: 'void',
    },
}

export function getUserProfile(token) {
    return async (dispatch, getState) => {
        const status = selectProfile(getState()).status
        if (status === 'running') {
            return
        }
        dispatch(actions.running())

        // Add a sleep delay to show loadSpinner before axios call
        await new Promise((r) => setTimeout(r, 800))

        try {
            const response = await axios.post(
                apiUrl + `/user/profile`,
                {},
                { headers: { Authorization: `Bearer ${token}` } },
                { timeout: 5000 }
            )
            const data = response.data
            console.log(data.body)
            dispatch(actions.success({ data: data.body }))
        } catch (error) {
            try {
                const errorMessage = error.response.data.message
                dispatch(
                    actions.failed({
                        error: errorMessage,
                    })
                )
            } catch {
                dispatch(
                    actions.failed({
                        error: 'Error: Backend is not active',
                    })
                )
            }
        }
    }
}

export function updateUserProfile(token, firstName, lastName) {
    return async (dispatch, getState) => {
        const editedProfile = selectProfile(getState()).editedProfile
        const status = editedProfile.status
        if (status === 'updating') {
            return
        }
        dispatch(actions.updating({ firstName: firstName, lastName: lastName }))

        // Add a sleep delay to show loadSpinner before axios call
        await new Promise((r) => setTimeout(r, 800))

        try {
            const response = await axios.put(
                apiUrl + `/user/profile`,
                {
                    firstName: firstName,
                    lastName: lastName,
                },
                { headers: { Authorization: `Bearer ${token}` } },
                { timeout: 5000 }
            )
            const data = response.data
            console.log(data.body)
            dispatch(
                actions.updated({ firstName: firstName, lastName: lastName })
            )
        } catch (error) {
            try {
                const errorMessage = error.response.data.message
                dispatch(
                    actions.updateFailed({
                        error: errorMessage,
                    })
                )
            } catch {
                dispatch(
                    actions.updateFailed({
                        error: 'Error: Backend is not active',
                    })
                )
            }
        }
    }
}

const { actions, reducer } = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        running: (draft, action) => {
            if (draft.status === 'void' || draft.status === 'success') {
                draft.status = 'running'
                return
            }
            if (draft.status === 'failed') {
                draft.error = null
                draft.status = 'running'
                return
            }
            return
        },
        success: (draft, action) => {
            if (draft.status === 'running') {
                draft.user = action.payload.data
                draft.status = 'success'
                return
            }
            return
        },
        failed: (draft, action) => {
            if (draft.status === 'running') {
                draft.error = action.payload.error
                draft.status = 'failed'
                return
            }
            return
        },
        updating: (draft, action) => {
            if (
                draft.editedProfile.status === 'updated' ||
                draft.editedProfile.status === 'void'
            ) {
                draft.editedProfile.firstName = action.payload.firstName
                draft.editedProfile.lastName = action.payload.lastName
                draft.editedProfile.status = 'updating'
                return
            }
            if (draft.editedProfile.status === 'updateFailed') {
                draft.editedProfile.firstName = action.payload.firstName
                draft.editedProfile.lastName = action.payload.lastName
                draft.editedProfile.error = null
                draft.editedProfile.status = 'updating'
                return
            }
            return
        },
        updated: (draft, action) => {
            if (draft.editedProfile.status === 'updating') {
                draft.editedProfile.status = 'updated'
                draft.user.firstName = action.payload.firstName
                draft.user.lastName = action.payload.lastName
                return
            }
            return
        },
        updateFailed: (draft, action) => {
            if (draft.editedProfile.status === 'updating') {
                draft.editedProfile.error = action.payload.error
                draft.editedProfile.status = 'updateFailed'
                return
            }
            return
        },
        newUpdate: (draft, action) => {
            if (draft.editedProfile.status !== 'void') {
                draft.editedProfile = initialState.editedProfile
                return
            }
            return
        },
    },
})

export default reducer
export const { newUpdate } = actions
