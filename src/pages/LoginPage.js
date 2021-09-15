import LoginForm from '../components/LoginForm'
import styled from 'styled-components'
import colors from '../utils/style/color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const LoginPageContent = styled.main`
    background-color: ${colors.backgroundDark};
`
const LoginPageContainer = styled.section`
    box-sizing: border-box;
    background-color: white;
    width: 300px;
    margin: 0 auto;
    margin-top: 3rem;
    padding: 2rem;
`

const LoginPageTitle = styled.h1``

const LoginIcon = styled(FontAwesomeIcon)`
    font-size: 3rem;
`

export default function LoginPage() {
    return (
        <LoginPageContent>
            <LoginPageContainer>
                <LoginIcon icon={faUserCircle} />
                <LoginPageTitle>Sign In</LoginPageTitle>
                <LoginForm />
            </LoginPageContainer>
        </LoginPageContent>
    )
}
