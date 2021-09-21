import logo from '../assets/argentBankLogo.png'
import colors from '../utils/style/color'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthentication } from '../utils/selectors'
import { logout } from '../features/authentication'

const HomeLogo = styled.img`
    max-width: 100%;
    width: 200px;
`

const StyledLink = styled(Link)`
    color: ${colors.secondary};
    font-weight: bold;
    color: #2c3e50;
    margin-right: 0.5rem;
`

const Icon = styled(FontAwesomeIcon)`
    margin: 0px 5px;
`

const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px min(20px, 2vw);

    & .main-nav-item {
        margin-right: 0.5rem;
        &:hover {
            text-decoration: underline;
        }
    }

    & .main-nav-logo {
        display: flex;
        align-items: center;
    }
`

function MainNav() {
    const authentication = useSelector(selectAuthentication)
    const dispatch = useDispatch()

    return (
        <NavContainer>
            <Link to="/" className="main-nav-logo">
                <HomeLogo src={logo} alt="Argent Bank Logo" />
            </Link>
            <div>
                <StyledLink to="/sign-in">
                    <Icon icon={faUserCircle} size="lg" />
                    {authentication.status === 'success' ? '' : 'Sign In'}
                </StyledLink>
                {authentication.status === 'success' && (
                    <StyledLink to="/" onClick={() => dispatch(logout())}>
                        <Icon icon={faSignOutAlt} size="lg" />
                        Sign Out
                    </StyledLink>
                )}
            </div>
        </NavContainer>
    )
}

export default MainNav
