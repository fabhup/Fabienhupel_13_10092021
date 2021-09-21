import App from './App'
import { render } from '../utils/tests'
import { screen, fireEvent } from '@testing-library/react'

describe('Given I am a user not connected', () => {
    describe('When I am going to the Homepage', () => {
        it('Should render HomePage content', async () => {
            render(<App />)
            expect(
                screen.getByText(
                    'Open a savings account with Argent Bank today!'
                )
            )
        })
    })
})
