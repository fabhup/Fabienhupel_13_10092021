import React from 'react'
import styled from 'styled-components'
import colors from '../utils/style/color'
import PropTypes from 'prop-types'
import LoadSpinner from '../components/LoadSpinner'

export const StyledButton = styled.button`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-color: ${colors.primaryLight};
    border: none;
    background-color: ${colors.primaryLight};
    color: white;
    cursor: pointer;
    text-decoration: underline;
    border-radius: 3px;
    ${(props) => {
        if (props.buttonBackgroundImage) {
            return `
            background-image: url(${props.buttonBackgroundImage});
            background-repeat: no-repeat;
            background-size: 13%;
            background-position: center;
            `
        }
    }}
`

export default function Button({
    buttonType,
    buttonText,
    buttonBackgroundImage,
    isLoading,
    className,
    onClick,
}) {
    return (
        <StyledButton
            className={className}
            type={buttonType}
            buttonBackgroundImage={buttonBackgroundImage}
            onClick={onClick}
        >
            {isLoading ? (
                <LoadSpinner
                    colorOfBars={'white'}
                    numberOfBars={4}
                    sizeRatio={0.4}
                    animationSpeed={6}
                />
            ) : (
                buttonText
            )}
        </StyledButton>
    )
}

Button.propTypes = {
    buttonType: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    buttonBackgroundImage: PropTypes.string,
    isLoading: PropTypes.bool,
}

Button.defaultProps = {
    isLoading: false,
}
