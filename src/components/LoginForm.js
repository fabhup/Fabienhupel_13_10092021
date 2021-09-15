import styled from 'styled-components'
import colors from '../utils/style/color'
import Input from './Input'

const LoginFormContainer = styled.form`
`

export default function LoginForm() {
    return (
        <LoginFormContainer>
            <Input
                inputType="text"
                inputId="username"
                inputLabel="Username"
            ></Input>
            <Input
                inputType="password"
                inputId="password"
                inputLabel="Password"
            ></Input>
            <Input
                inputType="checkbox"
                inputId="remember-me"
                inputLabel="Remember me"
            ></Input>
        </LoginFormContainer>
    )
}
