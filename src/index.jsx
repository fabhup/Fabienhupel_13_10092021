import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import App from './components/App'
import {worker} from './_mocks/browser'
import { Provider } from 'react-redux'
import store from './utils/store'

// This script is used to active mock on dev env (if env param REACT_APP_API_MOCKING is enabled) 
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_MOCKING === 'enabled') {
    const { worker } = require('./_mocks/browser')
    worker.start()
}

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>, 
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
