import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    pointer-events: none;
    ${(props) => {
        if (props.displayModal) {
            return `
                opacity: 1;
                pointer-events: visible;
            `
        }
    }}
`

const ModalContent = styled.div`
    width: 500px;
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
    margin: 2rem 2rem 3rem;
    transition: all 0.3s ease-in-out;
    transform: translateY(-500px);
    ${(props) => {
        if (props.displayModal) {
            return `
                transform: translateY(0px);
            `
        }
    }}
`

const ModalHeader = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-around;
`

const ModalTitle = styled.h3`
    margin: 1rem 0 0;
    font-size: 1.5rem;
`

const ModalBody = styled.div`
    padding: 10px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
`

function Modal({ title, onClose, children, displayModal, className }) {
    return ReactDOM.createPortal(
        <ModalContainer className={className} displayModal={displayModal}>
            <ModalContent
                onClick={(e) => e.stopPropagation()}
                displayModal={displayModal}
            >
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
                <ModalBody className="modal-body">{children}</ModalBody>
            </ModalContent>
        </ModalContainer>,
        document.getElementById('root')
    )
}

export default Modal
