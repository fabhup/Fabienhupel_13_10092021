import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const InputContainer = styled.div`
    display: flex;
    ${(props) => {
        if (props.type === 'text' || props.type === 'password') {
            return `
                flex-direction: column;
                text-align: left;
                margin-bottom: 1rem;
            `
        }
    }}
`
const InputLabel = styled.label`
    display: flex;
    font-weight: bold;
    ${(props) => {
        if (props.type === 'checkbox') {
            return `margin-left: 0.25rem;
            order:2`
        }
    }}
`

const InputElement = styled.input`
    ${(props) => {
        if (props.type === 'text' || props.type === 'password') {
            return `
                padding: 5px;
                font-size: 1.2rem;
            `
        } else if (props.type === 'checkbox') {
            return `
                margin: auto 0;
            `
        }
    }}
    ${(props) => {
        if (props.isInvalid) {
            return `
                color: red;
                border: 1px solid red;
                border-radius: 3px;
                box-shadow: 0px 0px red;
                z-index: 1;
            `
        }
    }}
`

const InputInvalidText = styled.span`
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
`

export default function Input({
    inputId,
    inputType,
    inputName,
    inputLabel,
    inputEvents,
    inputValue,
    isInvalid,
    isInvalidText,
}) {
    return (
        <InputContainer type={inputType}>
            <InputLabel type={inputType} htmlFor={inputId}>
                {inputLabel}
            </InputLabel>
            <InputElement
                type={inputType}
                id={inputId}
                name={inputName}
                onChange={inputEvents.onChange}
                onClick={inputEvents.onClick}
                defaultChecked={inputValue}
                isInvalid={isInvalid}
                autoComplete="on"
            />
            {isInvalid && <InputInvalidText>{isInvalidText}</InputInvalidText>}
        </InputContainer>
    )
}

Input.propTypes = {
    inputId: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    inputLabel: PropTypes.string,
    inputEvents: PropTypes.shape({
        onChange: PropTypes.func,
        onClick: PropTypes.func,
    }),
    inputValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    isInvalid: PropTypes.bool,
    isInvalidText: PropTypes.string,
}

Input.defaultProps = {
    inputEvents: {
        onChange: function () {},
        onClick: function () {},
    },
    isInvalid: false,
    isInvalidText: 'Invalid value',
}
