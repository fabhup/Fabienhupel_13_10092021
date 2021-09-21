import styled from 'styled-components'
import mediaQuery from '../utils/style/mediaQuery'
import Button from '../components/Button'
import colors from '../utils/style/color'

const AccountCardContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    background-color: white;
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    padding: 1.5rem;
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 2rem;
    ${mediaQuery.min.tablet`
        flex-direction: row;
    `}
`

const AccountContentWrapper = styled.div`
    width: 100%;
    flex: 1;
    color: ${colors.secondary};
    &.wrapper-button {
        ${mediaQuery.min.tablet`
            flex: 0;
        `}
    }
`

const AccountAmount = styled.p`
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
`

const AccountAmountDescription = styled.p`
    margin: 0;
`

const AccountTitle = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: normal;
`

const AccountButtonTransaction = styled(Button)`
    width: 100%;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
    ${mediaQuery.min.tablet`
        width: 200px;
    `}
`

export default function AccountCard({
    accountNumber,
    accountTitle,
    accountAmount,
    accountCurrency,
    accountDescription,
}) {
    return (
        <AccountCardContainer>
            <AccountContentWrapper>
                <AccountTitle>
                    {`${accountTitle} (XX${accountNumber.slice(-4)})`}
                </AccountTitle>
                <AccountAmount>
                    {accountCurrency}
                    {accountAmount.toLocaleString('en')}
                </AccountAmount>
                <AccountAmountDescription>
                    {accountDescription}
                </AccountAmountDescription>
            </AccountContentWrapper>
            <AccountContentWrapper className="wrapper-button">
                <AccountButtonTransaction buttonText="View transaction" />
            </AccountContentWrapper>
        </AccountCardContainer>
    )
}
