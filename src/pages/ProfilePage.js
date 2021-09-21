import { getUserProfile } from '../features/profile'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthentication, selectProfile } from '../utils/selectors'
import { useEffect } from 'react'
import LoadSpinner from '../components/LoadSpinner'
import styled from 'styled-components'
import colors from '../utils/style/color'
import Button from '../components/Button'
import AccountCard from '../components/AccountCard'

const ProfilePageContent = styled.main`
    background-color: ${colors.backgroundDark};
    display: flex;
    justify-content: center;
    align-items: center;
`
const ProfilePageHeader = styled.div`
    color: white;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`

const EditButton = styled(Button)`
    border-color: ${colors.primaryLight};
    background-color: ${colors.primaryLight};
    color: white;
    font-weight: bold;
    padding: 10px;
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
        dispatch(getUserProfile(authentication.token))
    }, [dispatch, authentication.token])

    return (
        <ProfilePageContent>
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
                    <EditButton buttonText="Edit Name" />
                    {accountData.map((elt, index) => (
                        <AccountCard
                            accountNumber={elt.number}
                            accountTitle={elt.title}
                            accountAmount={elt.amount}
                            accountCurrency={elt.currency}
                            accountDescription={elt.description}
                            key={index}
                        />
                    ))}
                </ProfilePageHeader>
            )}
        </ProfilePageContent>
    )
}
