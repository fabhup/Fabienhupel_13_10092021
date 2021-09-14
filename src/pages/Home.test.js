import { screen } from '@testing-library/react'
import Home from './Home'
import { render } from '../utils/tests'

describe('The Home component', () => {
    it('should be rendered', () => {
        render(<Home />)
        expect(
            screen.getByText('Open a savings account with Argent Bank today!')
        ).toBeTruthy()
    })
})
