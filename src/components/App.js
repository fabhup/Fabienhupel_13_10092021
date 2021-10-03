import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthentication } from '../utils/selectors'
import GlobalStyle from '../utils/style/GlobalStyle'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import Header from './Header'
import Footer from './Footer'
import LoadSpinner from './LoadSpinner'
import { routerBaseName } from '../utils/config/config'
import { useEffect, useState } from 'react'
import colors from '../utils/style/color'

export default function App() {
    const authentication = useSelector(selectAuthentication)

    const [isLoading, setIsLoading] = useState(true)
    useEffect(async () => {
        await new Promise((r) => setTimeout(r, 500))
        setIsLoading(false)
    }, [])

    return (
        <Router basename={routerBaseName}>
            <GlobalStyle />
            {isLoading ? (
                <LoadSpinner
                    colorOfBars={colors.primaryLight}
                    numberOfBars={4}
                    sizeRatio={1.5}
                    animationSpeed={4}
                />
            ) : (
                <>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            {authentication.status !== 'success' &&
                            !localStorage.getItem('user_loggedIn') ? (
                                <HomePage />
                            ) : (
                                <Redirect from="/" to="/profile" />
                            )}
                        </Route>
                        <Route exact path="/sign-in">
                            {authentication.status !== 'success' &&
                            !localStorage.getItem('user_loggedIn') ? (
                                <LoginPage />
                            ) : (
                                <Redirect from="/sign-in" to="/profile" />
                            )}
                        </Route>
                        {(authentication.status === 'success' ||
                            localStorage.getItem('user_loggedIn')) && (
                            <Route exact path="/profile">
                                <ProfilePage />
                            </Route>
                        )}
                        <Redirect
                            from="*"
                            to={
                                authentication.status === 'success'
                                    ? '/profile'
                                    : '/'
                            }
                        />
                    </Switch>
                    <Footer />
                </>
            )}
        </Router>
    )
}
