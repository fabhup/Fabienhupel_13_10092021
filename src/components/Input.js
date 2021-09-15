import React from 'react'
import styled from 'styled-components'

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
    ${(props) => {
        switch (props.type) {
            case 'text':
                return `font-weight: bold;`
            case 'password':
                return `font-weight: bold;`
            case 'checkbox':
                return `margin-left: 0.25rem;`
            default:
                break
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
        }
    }}
`

export default function Input({ inputId, inputType, inputLabel }) {
    if (inputType === 'text' || inputType === 'password') {
        return (
            <InputContainer type={inputType}>
                <InputLabel type={inputType} htmlFor={inputId}>
                    {inputLabel}
                </InputLabel>
                <InputElement type={inputType} id={inputId} />
            </InputContainer>
        )
    } else if (inputType === 'checkbox') {
        return (
            <InputContainer type={inputType}>
                <InputElement type={inputType} id={inputId} />
                <InputLabel type={inputType} htmlFor={inputId}>
                    {inputLabel}
                </InputLabel>
            </InputContainer>
        )
    }
}
