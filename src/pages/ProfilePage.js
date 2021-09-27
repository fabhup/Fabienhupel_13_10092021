import { getUserProfile, updateUserProfile } from '../features/profile'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthentication, selectProfile } from '../utils/selectors'
import { useEffect, useState } from 'react'
import LoadSpinner from '../components/LoadSpinner'
import styled from 'styled-components'
import colors from '../utils/style/color'
import Button from '../components/Button'
import AccountCard from '../components/AccountCard'
import EditProfileModal from '../components/EditProfileModal'
import { newUpdate } from '../features/profile'

const ProfilePageContent = styled.main`
    background-color: ${colors.backgroundDark};
    display: flex;
    justify-content: center;
    align-items: flex-start;
    ${(props) => {
        if (props.loading === 'true') {
            return `align-items: center;`
        }
    }}
`
const ProfilePageHeader = styled.div`
    color: white;
    margin: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
`

const EditButton = styled(Button)`
    border-color: ${colors.primaryLight};
    background-color: ${colors.primaryLight};
    color: white;
    font-weight: bold;
    padding: 10px 20px;
    margin-bottom: 2rem;
`

const accountData = [
    {
        number: '1234567898349',
        title: 'Argent Bank Checking',
        amount: 2082.79,
        currency: '$',
        description: 'Available Balance',
    },
    {
        number: '1234567896712',
        title: 'Argent Bank Savings',
        amount: 10928.42,
        currency: '$',
        description: 'Available Balance',
    },
    {
        number: '1234567898349',
        title: 'Argent Bank Credit Card',
        amount: 184.3,
        currency: '$',
        description: 'Current Balance',
    },
]

export default function ProfilePage() {
    // get Redux state for authentication
    const dispatch = useDispatch()
    const authentication = useSelector(selectAuthentication)
    const profile = useSelector(selectProfile)

    useEffect(() => {
        if (
            profile.status !== 'success' &&
            !localStorage.getItem('user_profile')
        ) {
            dispatch(getUserProfile(authentication.token))
        }
    }, [dispatch, authentication.token])

    const [displayEditProfileModal, setDisplayEditProfileModal] =
        useState(false)

    return (
        <ProfilePageContent
            loading={profile.status === 'running' ? 'true' : 'false'}
        >
            {profile.status === 'running' ? (
                <LoadSpinner
                    colorOfBars={colors.primaryLight}
                    numberOfBars={4}
                    sizeRatio={1.5}
                    animationSpeed={4}
                />
            ) : (
                <ProfilePageHeader>
                    <h1>
                        {'Welcome back'}
                        <br />
                        {`${profile.user.firstName} ${profile.user.lastName}!`}
                    </h1>
                    <EditButton
                        buttonText="Edit Name"
                        onClick={() => {
                            setDisplayEditProfileModal(true)
                            dispatch(newUpdate())
                        }}
                    />
                    {accountData.map((elt, index) => (
                        <AccountCard
                            accountNumber={elt.number}
                            accountTitle={elt.title}
                            accountAmount={elt.amount}
                            accountCurrency={elt.currency}
                            key={index}
                        />
                    ))}
                </ProfilePageHeader>
            )}
            <EditProfileModal
                title="Edit Profile"
                onClose={() => {
                    setDisplayEditProfileModal(false)
                }}
                displayModal={displayEditProfileModal}
            ></EditProfileModal>
        </ProfilePageContent>
    )
}
