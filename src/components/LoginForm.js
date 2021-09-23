import styled from 'styled-components'
import Input from './Input'
import Button from '../components/Button'
import { login } from '../features/authentication'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthentication } from '../utils/selectors'
import { useHistory } from 'react-router-dom'

const LoginFormContainer = styled.form``

const SignInButton = styled(Button)`
    width: 100%;
    height: 2.5rem;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
`
export default function LoginForm() {
    // local states for LoginForm component
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        remember: true,
    })
    const [submitted, setSubmitted] = useState(false)
    const { username, password, remember } = inputs

    // hook for redirect route
    let history = useHistory()

    // get Redux state for authentication
    const dispatch = useDispatch()
    const authentication = useSelector(selectAuthentication)

    useEffect(() => {
        // if user is logged redirection to profilePage
        if (authentication.status === 'success') {
            history.push('/profile')
        }
    }, [authentication.status])

    // function to update states after each changes on inputs username & password
    function handleChangeText(e) {
        const { name, value } = e.target
        setInputs((inputs) => ({ ...inputs, [name]: value }))
        setSubmitted(false)
    }

    // function to update state of checkbox inputs after each change on checkbox input
    function handleChangeCheckbox(e) {
        const { name } = e.target
        const checked = e.target.checked
        setInputs((inputs) => ({ ...inputs, [name]: checked }))
    }

    // function on submit form : redux state authentication is updated
    // and route is redirected to Page if success
    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(true)
        if (username && password) {
            dispatch(login(username, password))
        }
        if (authentication.status === 'success') {
            history.push('/profile')
        }
    }

    // constants to manage Invalid Inputs
    const isPasswordNotSpecified = submitted && !password
    const isPasswordInvalid =
        submitted && authentication.error === 'Error: Password is invalid'
    const isInputPasswordInvalid = isPasswordNotSpecified || isPasswordInvalid
    const isUsernameNotSpecified = submitted && !username
    const isUsernameInvalid =
        submitted &&
        authentication.error === 'Error: User not found!' &&
        password
    const isInputUsernameInvalid = isUsernameNotSpecified || isUsernameInvalid

    return (
        <LoginFormContainer onSubmit={handleSubmit}>
            <Input
                inputType="text"
                inputId="username"
                inputLabel="Username"
                inputName="username"
                inputValue={username}
                inputEvents={{ onChange: handleChangeText }}
                isInvalid={isInputUsernameInvalid}
                isInvalidText={
                    isUsernameNotSpecified
                        ? 'Please enter your username'
                        : 'This username is unknown'
                }
            ></Input>
            <Input
                inputType="password"
                inputId="password"
                inputLabel="Password"
                inputName="password"
                inputValue={password}
                inputEvents={{ onChange: handleChangeText }}
                isInvalid={isInputPasswordInvalid}
                isInvalidText={
                    isPasswordNotSpecified
                        ? 'Please enter your password'
                        : 'Your password is incorrect'
                }
            ></Input>
            <Input
                inputType="checkbox"
                inputId="remember-me"
                inputLabel="Remember me"
                inputName="remember"
                inputValue={remember}
                inputEvents={{ onChange: handleChangeCheckbox }}
            ></Input>
            <SignInButton
                style={{ position: 'relative' }}
                buttonType="submit"
                buttonText="Sign In"
                isLoading={authentication.status === 'running'}
            />
        </LoginFormContainer>
    )
}
