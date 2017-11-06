import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import kbaApp from './reducers'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'

import registerServiceWorker from './utilities/registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './index.css'
import Mainframe from './components/Mainframe'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

// https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);
let store = createStoreWithMiddleware(kbaApp);
let rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Mainframe />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
