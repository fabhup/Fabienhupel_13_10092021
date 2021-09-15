import { screen } from '@testing-library/react'
import LoginPage from './LoginPage'
import { render } from '../utils/tests'

describe('When the LoginPage is mounted', () => {
    it('should be rendered', () => {
        render(<LoginPage />)
        expect(screen.getByLabelText('Username')).toBeTruthy()
    })
})
