import { rest } from 'msw'
import { users } from './mockedData'
import { apiUrl } from '../utils/config/config'
import jwt from 'jsonwebtoken'

// handlers for mocking api calls (for tests and development without backend)
export const handlers = [
    rest.post(apiUrl + '/user/login', (req, res, ctx) => {
        const { email, password } = req.body
        const ctxDelay = 500
        let ctxStatus = null
        let ctxJSON = null

        // find if any user matches login
        let user = users.find((user) => {
            return user.email === email
        })

        if (!user) {
            ctxStatus = 400
            ctxJSON = { message: 'Error: User not found!' }
        } else {
            const isValidPassword = password === user.password
            if (!isValidPassword) {
                ctxStatus = 400
                ctxJSON = { message: 'Error: Password is invalid' }
            } else {
                ctxStatus = 200
                const token = jwt.sign(
                    { id: user._id },
                    process.env.REACT_APP_SECRET_KEY || 'default-secret-key',
                    { expiresIn: '1d' }
                )
                ctxJSON = { body: { token: token } }
            }
        }
        return res(
            ctx.delay(ctxDelay),
            ctx.status(ctxStatus),
            ctx.json(ctxJSON)
        )
    }),
]
