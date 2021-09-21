import styled, { keyframes, css } from 'styled-components'
import PropTypes from 'prop-types'

const LoadSpinnerContainer = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
    margin-top: 1em;
    padding: 0.5em;
`
const AnimBars = keyframes`
    0% {transform: scaleY(0.5);}
    100% {transform: scaleY(1);}
`

const createCSS = (props) => {
    let styles = ''
    const animationDelay = 250 / props.animationSpeed || 250
    for (let i = 1; i <= props.numberOfBars; i += 1) {
        styles += `
        .load__bar--${i} {
            animation-delay: ${animationDelay * i}ms;
         }
       `
    }
    return css`
        ${styles}
    `
}

const LoadSpinnerWrapper = styled.span`
    width: ${(props) => (props.sizeRatio || 1) * 7}em;
    height: ${(props) => (props.sizeRatio || 1) * 3}em;
    display: flex;
    justify-content: space-evenly;
    & .load__bar {
        display: block;
        background-color: ${(props) => props.colorOfBars || 'grey'};
        border-radius: 5em;
        height: 100%;
        width: ${(props) => (props.sizeRatio || 1) * 1}em;
        animation: ${AnimBars}
            ${(props) => 1250 / (props.animationSpeed || 1)}ms backwards
            infinite ease-in-out alternate;
    }
    ${(props) => createCSS(props)}
`

export default function LoadSpinner({
    colorOfBars,
    numberOfBars,
    sizeRatio,
    animationSpeed,
}) {
    return (
        <LoadSpinnerContainer>
            <LoadSpinnerWrapper
                colorOfBars={colorOfBars}
                sizeRatio={sizeRatio}
                numberOfBars={numberOfBars}
                animationSpeed={animationSpeed}
            >
                {[...Array(numberOfBars)].map((x, i) => (
                    <span
                        key={i + 1}
                        className={`load__bar load__bar--${i + 1}`}
                    />
                ))}
            </LoadSpinnerWrapper>
        </LoadSpinnerContainer>
    )
}

LoadSpinner.propTypes = {
    colorOfBars: PropTypes.string,
    numberOfBars: PropTypes.number,
    sizeRatio: PropTypes.number,
    animationSpeed: PropTypes.number,
}

LoadSpinner.defaultProps = {
    colorOfBars: 'grey',
    numberOfBars: 5,
    sizeRatio: 1,
    animationSpeed: 1,
}
