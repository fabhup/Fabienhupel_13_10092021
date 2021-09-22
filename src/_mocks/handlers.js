import { rest } from 'msw'
import { users } from './mockedData'
import { apiUrl } from '../utils/config/config'
import jwt from 'jsonwebtoken'

// handlers for mocking api calls (for tests and development without backend)
export const handlers = [
    rest.post(apiUrl + '/user/login', loginUser),
    rest.post(apiUrl + '/user/profile', getUserWithToken),
]

function loginUser(req, res, ctx) {
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
    return res(ctx.delay(ctxDelay), ctx.status(ctxStatus), ctx.json(ctxJSON))
}

function getUserWithToken(req, res, ctx) {
    validateToken(req, res, ctx)
    return getUserProfile(req, res, ctx)
}

function getUserProfile(req, res, ctx) {
    const ctxDelay = 500
    let ctxStatus = null
    let ctxJSON = null

    const jwtToken = req.headers._headers.authorization
        .split('Bearer')[1]
        .trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = users.find((user) => {
        return user._id === decodedJwtToken.id
    })

    if (!user) {
        ctxStatus = 400
        ctxJSON = { message: 'User not found' }
    } else {
        ctxStatus = 200
        ctxJSON = user
        ctxJSON = { body: user }
        console.log(ctxJSON)
    }
    return res(ctx.delay(ctxDelay), ctx.status(ctxStatus), ctx.json(ctxJSON))
}

function validateToken(req, res, ctx) {
    const ctxDelay = 500
    let ctxStatus = null
    let ctxJSON = null
    try {
        const userToken = req.headers._headers.authorization
            .split('Bearer')[1]
            .trim()
        const decodedToken = jwt.verify(
            userToken,
            process.env.REACT_APP_SECRET_KEY || 'default-secret-key'
        )
        console.log('token verified')
        return next()
    } catch (error) {
        if (!req.headers._headers.authorization) {
            ctxStatus = 400
            ctxJSON = { message: 'Token is missing from header' }
        }
    }
    return res(ctx.delay(ctxDelay), ctx.status(ctxStatus), ctx.json(ctxJSON))
}
