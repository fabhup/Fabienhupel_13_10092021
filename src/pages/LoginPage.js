import LoginForm from '../components/LoginForm'
import styled from 'styled-components'
import colors from '../utils/style/color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { selectAuthentication } from '../utils/selectors'
import { faFrown } from '@fortawesome/free-regular-svg-icons'

const LoginPageContent = styled.main`
    background-color: ${colors.backgroundDark};
    display: flex;
    align-items: center;
`
const LoginPageContainer = styled.section`
    box-sizing: border-box;
    background-color: white;
    width: 300px;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 2rem;
`

const LoginPageTitle = styled.h1`
    margin: 0.83em;
    font-size: 1.5em;
`

const LoginIcon = styled(FontAwesomeIcon)`
    font-size: 3rem;
`

const LoginErrorContainer = styled.div`
    padding: 5rem 0;
`

const LoginErrorIcon = styled(FontAwesomeIcon)`
    font-size: 5rem;
`
const LoginErrorMessage = styled.span`
    display: block;
    margin: 2rem 0.5rem;
    & br {
        display: block;
        margin: 5px 0;
        content: ' ';
    }
`

export default function LoginPage() {
    const authentication = useSelector(selectAuthentication)

    return (
        <LoginPageContent>
            <LoginPageContainer>
                {//content displayed if there is an error with backend
                authentication.error === 'Error: Backend is not active' ? (
                    <LoginErrorContainer>
                        <LoginErrorIcon icon={faFrown} />
                        <LoginErrorMessage>
                            Sorry, something went wrong !<br />
                            You can refresh this page or retry later.
                        </LoginErrorMessage>
                    </LoginErrorContainer>
                ) : (
                    // Login Form content
                    <>
                        <LoginIcon icon={faUserCircle} />
                        <LoginPageTitle>Sign In</LoginPageTitle>
                        <LoginForm />
                    </>
                )}
            </LoginPageContainer>
        </LoginPageContent>
    )
}
