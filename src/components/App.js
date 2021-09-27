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

export default function App() {
    const authentication = useSelector(selectAuthentication)
    return (
        <Router>
            <GlobalStyle />
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
                    to={authentication.status === 'success' ? '/profile' : '/'}
                />
            </Switch>
            <Footer />
        </Router>
    )
}
