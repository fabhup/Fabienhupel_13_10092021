import styled from 'styled-components'
import colors from '../utils/style/color'

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    border-top: 2px solid ${colors.backgroundLight};
    padding: 2vh 0 1.5vh;
`

function Footer() {
    return (
        <FooterContainer>
            <p>{`Copyright ${new Date().getFullYear()} Argent Bank`}</p>
        </FooterContainer>
    )
}

export default Footer
