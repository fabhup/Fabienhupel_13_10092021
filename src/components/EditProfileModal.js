import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import styled from 'styled-components'
import Modal from './Modal'
import { useSelector } from 'react-redux'
import { selectProfile } from '../utils/selectors'
import Input from '../components/Input'
import mediaQuery from '../utils/style/mediaQuery'

const ModalButton = styled(Button)`
    width: 60%;
    height: 2.5rem;
    padding: 2px 12px;
    font-size: 1rem;
    font-weight: bold;
    margin: 0.5rem 1rem 1rem;
`

const FormEditProfile = styled.form`
    padding: 8px 12px;
    margin: 1rem 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FormButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    ${mediaQuery.min.tablet`
        flex-direction: row;
    `}
    margin: 1rem .5rem 0;
`

function EditProfileModal({ title, onClose, children, displayModal }) {
    const profile = useSelector(selectProfile)

    return (
        <Modal
            title="Edit Profile"
            onClose={onClose}
            displayModal={displayModal}
            className={'modal'}
        >
            <FormEditProfile onSubmit={() => console.log('closed')}>
                <Input
                    inputType="text"
                    inputId="firstname"
                    inputLabel="Firstname"
                    inputName="firstname"
                    inputValue={profile.user.firstName}
                ></Input>
                <Input
                    inputType="text"
                    inputId="lastname"
                    inputLabel="Lastname"
                    inputName="lastname"
                    inputValue={profile.user.lastName}
                ></Input>
            </FormEditProfile>
            <FormButtonsContainer>
                <ModalButton onClick={onClose} buttonText={'Cancel'} />
                <ModalButton onClick={onClose} buttonText={'Save Changes'} />
            </FormButtonsContainer>
        </Modal>
    )
}

export default EditProfileModal
