import { screen } from '@testing-library/react'
import HomePage from './HomePage'
import { render } from '../utils/tests'

describe('The Home component', () => {
    it('should be rendered', () => {
        render(<HomePage />)
        expect(
            screen.getByText('Open a savings account with Argent Bank today!')
        ).toBeTruthy()
    })
})
