import MainNav from './MainNav'
import { render } from '../utils/tests'
import { screen, fireEvent } from '@testing-library/react'

describe('MainNav', () => {
    it('Should render MainNav', async () => {
        render(<MainNav />)
    })
    it('Should return to Home', () => {
        render(<MainNav />)
        const homeLogo = screen.getByAltText('Argent Bank Logo')
        fireEvent.click(homeLogo)
        expect(screen.getByText('Sign In'))
    })
})
