import logo from '../assets/argentBankLogo.png'
import colors from '../utils/style/color'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

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
    return (
        <NavContainer>
            <Link to="/" className="main-nav-logo">
                <HomeLogo src={logo} alt="Argent Bank Logo" />
            </Link>
            <div>
                <StyledLink to="/sign-in">
                    <Icon icon={faUserCircle} size="lg" />
                    Sign In
                </StyledLink>
            </div>
        </NavContainer>
    )
}

export default MainNav
