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
import UserPage from '../pages/UserPage'
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
                    {authentication.status !== 'success' ? (
                        <HomePage />
                    ) : (
                        <Redirect from="/" to="/user" />
                    )}
                </Route>
                <Route exact path="/sign-in">
                    {authentication.status !== 'success' ? (
                        <LoginPage />
                    ) : (
                        <Redirect from="/sign-in" to="/user" />
                    )}
                </Route>
                {authentication.status === 'success' && (
                    <Route exact path="/user">
                        <UserPage />
                    </Route>
                )}
                <Redirect from="*" to="/" />
            </Switch>
            <Footer />
        </Router>
    )
}
