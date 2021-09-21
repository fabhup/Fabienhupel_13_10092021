import { useSelector } from 'react-redux'
import { selectAuthentication } from '../utils/selectors'
import LoadSpinner from '../components/LoadSpinner'

export default function UserPage() {
    const authentication = useSelector(selectAuthentication)
    const username = authentication.username

    return <div className="userpage">Welcome back {username}</div>
}
