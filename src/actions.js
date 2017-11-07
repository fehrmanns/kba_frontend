
import { CALL_API } from './middleware/api'
// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const QUOTE_REQUEST = 'QUOTE_REQUEST'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAILURE = 'QUOTE_FAILURE'


function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('profile')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        dispatch(receiveLogout())
    }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

    const encodeLogin = "Basic " + btoa(creds.username + ":" + creds.password);
    let loginHeader = new Headers();
    loginHeader.append("authentication", encodeLogin);
    let config = {
        method: 'GET',
        headers: loginHeader,
        mode: 'none'
    }

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds))

        return fetch('http://localhost:8080/befe/rest/login', config)
            .then(response => {
                switch (response.status) {
                    // TODO: add correct messages
                    case 500: console.error('Some server error'); break;
                    case 400: dispatch(loginError("Dumm gelaufen")); break;
                    case 401: dispatch(loginError("Dumm gelaufen")); break;
                    default: response.json()
                        .then(user => ({ user, response }))
                        .then(({ user, response }) => {
                            if (!response.ok) {
                                // If there was a problem, we want to
                                // dispatch the error condition
                                dispatch(loginError("Dumm gelaufen"))
                                return Promise.reject(user)
                            } else {
                                // If login was successful, set the token in local storage
                                localStorage.setItem('profile', JSON.stringify(user.kbaUser))
                                localStorage.setItem('auth_token', user.authtoken)
                                localStorage.setItem('refresh_token', user.refreshtoken)

                                // Dispatch the success action
                                dispatch(receiveLogin(user))
                            }
                        })
                }
            }).catch(err => console.log("Error: ", err))
    }
}

// Uses the API middlware to get a quote
export function fetchQuote() {
    return {
        [CALL_API]: {
            endpoint: 'random-quote',
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    }
}

// Same API middlware is used to get a
// secret quote, but we set authenticated
// to true so that the auth header is sent
export function fetchSecretQuote() {
    return {
        [CALL_API]: {
            endpoint: 'protected/random-quote',
            authenticated: true,
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    }
}
