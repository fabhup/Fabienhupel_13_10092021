import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import styled from 'styled-components'
import Modal from './Modal'
import colors from '../utils/style/color'
import { useSelector, useDispatch } from 'react-redux'
import { selectProfile, selectAuthentication } from '../utils/selectors'
import Input from '../components/Input'
import mediaQuery from '../utils/style/mediaQuery'
import { updateUserProfile } from '../features/profile'
import { useState } from 'react'
import LoadSpinner from '../components/LoadSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheckCircle,
    faTimesCircle,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'

const ModalButton = styled(Button)`
    width: 100%;
    height: 2.5rem;
    padding: 2px 12px;
    font-size: 1rem;
    font-weight: bold;
    margin: 0.5rem 0.5rem 1rem;
`

const FormEditProfile = styled.form`
    padding: 8px 12px;
    margin: 1rem 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FormButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin: 1rem 0.5rem 0;
`

const ModalConfirmMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & br {
        display: block;
        margin: 1rem 0;
        content: ' ';
    }
    & strong {
        font-size: 1.2rem;
    }
`
const IconConfirmMessage = styled(FontAwesomeIcon)`
    margin: 0rem 1rem 1rem;
`

function EditProfileModal({ title, onClose, children, displayModal }) {
    //get state Redux authentication and profile
    const authentication = useSelector(selectAuthentication)
    const profile = useSelector(selectProfile)
    const dispatch = useDispatch()

    //state for newProfile informations typed by user
    const initialStateNewProfile = {
        key: Date.now(),
        newFirstName: null,
        newLastName: null,
    }
    const [newProfile, setNewProfile] = useState(initialStateNewProfile)
    const { newFirstName, newLastName } = newProfile
    const currentFirstName = profile.user.firstName
    const currentLastName = profile.user.lastName

    //state for hide or display confirm message
    const [displayConfirmMessage, setDisplayConfirmMessage] = useState(false)

    // message to display if there is no changes
    const noChangesMessage =
        'No modification has been made so your first and last name will not be modified'
    const noChanges =
        profile.editedProfile.status === 'void' &&
        ((!newFirstName && !newLastName) ||
            (newFirstName === currentFirstName &&
                newLastName === currentLastName) ||
            (newLastName === currentLastName && !newFirstName) ||
            (newFirstName === currentFirstName && !newLastName))

    const isUpdating = profile.editedProfile.status === 'updating'
    const isError = profile.editedProfile.status === 'updateFailed'

    // function to update newProfile state after each changes on inputs newFirstName & newLastName
    function handleChangeText(e) {
        const { name, value } = e.target
        setNewProfile((newProfile) => ({ ...newProfile, [name]: value }))
    }

    // function to save changes and update profile state on success update
    async function saveAndUpdateProfile() {
        dispatch(
            updateUserProfile(
                authentication.token,
                newFirstName || profile.user.firstName,
                newLastName || profile.user.lastName
            )
        )
    }

    function onSubmitForm(e) {
        e.preventDefault()
        if (newFirstName === '' || newLastName === '') {
            return false
        }
        setDisplayConfirmMessage(true)
    }

    async function closeModalAndReset() {
        onClose()
        await setTimeout(function () {
            setNewProfile(initialStateNewProfile)
            setDisplayConfirmMessage(false)
        }, 1000)
    }

    return (
        <Modal
            title="Edit Profile"
            onClose={onClose}
            displayModal={displayModal}
            className={'modal'}
            key={newProfile.key}
        >
            <FormEditProfile
                onSubmit={onSubmitForm}
                onReset={(e) => e.preventDefault()}
                noValidate
            >
                {displayConfirmMessage ? (
                    <>
                        <ModalConfirmMessage>
                            {/* Message if no changes to update */}
                            {noChanges && (
                                <>
                                    <IconConfirmMessage
                                        icon={faInfoCircle}
                                        size="4x"
                                        color={colors.primaryLight}
                                    />
                                    <span> {noChangesMessage} </span>
                                </>
                            )}

                            {/* Confirm Message before update */}
                            {!noChanges &&
                                profile.editedProfile.status === 'void' && (
                                    <span>
                                        {`Are you sure you want to update your profile
                                with this new name ? `}
                                        <br />
                                        <strong>
                                            {newFirstName ||
                                                profile.user.firstName}{' '}
                                            {newLastName ||
                                                profile.user.lastName}
                                        </strong>
                                    </span>
                                )}

                            {/* Confirm Message on updating (loadspinner) */}
                            {isUpdating && (
                                <LoadSpinner
                                    colorOfBars={colors.primaryLight}
                                    numberOfBars={4}
                                    sizeRatio={1}
                                    animationSpeed={6}
                                />
                            )}

                            {/* Confirm Message on update success */}
                            {profile.editedProfile.status === 'updated' && (
                                <>
                                    <IconConfirmMessage
                                        icon={faCheckCircle}
                                        size="4x"
                                        color={colors.primaryLight}
                                    />
                                    <span>{`Your profile has been updated with success`}</span>
                                </>
                            )}

                            {/* Confirm Message on update failed */}
                            {profile.editedProfile.status ===
                                'updateFailed' && (
                                <>
                                    <IconConfirmMessage
                                        icon={faTimesCircle}
                                        size="4x"
                                        color={colors.redDark}
                                    />
                                    <span>
                                        <strong>{`... We are sorry`}</strong>
                                        <br />
                                        {`An error has occured, please retry later.`}
                                    </span>
                                </>
                            )}
                        </ModalConfirmMessage>

                        <FormButtonsContainer>
                            <ModalButton
                                buttonText={
                                    noChanges ||
                                    profile.editedProfile.status ===
                                        'updated' ||
                                    profile.editedProfile.status ===
                                        'updateFailed'
                                        ? 'Close'
                                        : 'Cancel'
                                }
                                onClick={closeModalAndReset}
                                buttonType="reset"
                            />
                            {!noChanges &&
                                profile.editedProfile.status === 'void' && (
                                    <ModalButton
                                        onClick={saveAndUpdateProfile}
                                        buttonText={'OK'}
                                    />
                                )}
                        </FormButtonsContainer>
                    </>
                ) : (
                    <>
                        <Input
                            inputType="text"
                            inputId="newFirstName"
                            inputLabel="New First Name"
                            inputName="newFirstName"
                            inputValue={newFirstName}
                            inputDefaultValue={profile.user.firstName}
                            inputEvents={{ onChange: handleChangeText }}
                            isRequired="true"
                            isInvalid={newFirstName === ''}
                            isInvalidText={'First Name is required'}
                        ></Input>
                        <Input
                            inputType="text"
                            inputId="newLastName"
                            inputLabel="New Last Name"
                            inputName="newLastName"
                            inputValue={newLastName}
                            inputDefaultValue={profile.user.lastName}
                            inputEvents={{ onChange: handleChangeText }}
                            isRequired="true"
                            isInvalid={newLastName === ''}
                            isInvalidText={'Last Name is required'}
                        ></Input>
                        <FormButtonsContainer>
                            <ModalButton
                                buttonText={'Cancel'}
                                onClick={closeModalAndReset}
                                buttonType="reset"
                            />
                            <ModalButton
                                buttonText={'OK'}
                                buttonType="submit"
                            />
                        </FormButtonsContainer>
                    </>
                )}
            </FormEditProfile>
        </Modal>
    )
}

export default EditProfileModal
