import Footer from './Footer'
import { render } from '../utils/tests'
import { screen, fireEvent } from '@testing-library/react'

describe('Footer component', () => {
    it('Should render Footer content', async () => {
        render(<Footer />)
        expect(
            screen.getByText(
                `Copyright ${new Date().getFullYear()} Argent Bank`
            )
        )
    })
})
