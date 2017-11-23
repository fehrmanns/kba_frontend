import {CALL_API} from './middleware/api'
// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';

export const USER_LOADED = 'USER_LOADED';
export const USER_ADDED = 'USER_ADDED';
export const USER_DELETED = 'USER_DELETED';
export const USER_UPDATED = 'USER_UPDATED';
export const USER_FAILURE = 'USER_FAILURE';

// login & logout handling
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
        id_token: user.auth_token
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
        dispatch(requestLogout());
        localStorage.removeItem('profile');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        dispatch(receiveLogout())
    }
}

// Calls the API to get a token
export function loginUser(creds) {
    const encodeLogin = "Basic " + btoa(creds.username + ":" + creds.password);
    let loginHeader = new Headers();
    loginHeader.append("authentication", encodeLogin);
    let config = {
        method: 'GET',
        headers: loginHeader
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));

        return fetch('http://localhost:8080/befe/rest/login', config)
            .then(response => {
                switch (response.status) {
                    // TODO: add correct messages
                    case 200:
                        response.json()
                            .then(user => ({user, response}))
                            .then(({user, response}) => {
                                if (!response.ok) {
                                    // If there was a problem, we want to
                                    // dispatch the error condition
                                    dispatch(loginError("Login error"));
                                    return Promise.reject(user)
                                } else {
                                    // If login was successful, set the token in local storage
                                    localStorage.setItem('profile', JSON.stringify(user.kbaUser));
                                    localStorage.setItem('auth_token', user.authtoken);
                                    localStorage.setItem('refresh_token', user.refreshtoken);

                                    // Dispatch the success action
                                    dispatch(receiveLogin(user))
                                }
                            });
                        break;
                    case 400:
                        dispatch(loginError("400"));
                        break;
                    case 401:
                        dispatch(loginError("401"));
                        break;
                    case 500:
                        console.error('500 Some server error');
                        break;
                    default:
                        console.warn('Some uncatched server response:', response.status);
                }
            }).catch(err => console.warn("Error: ", err))
    }
}

export function probeToken() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const endpoint = "management/users/" + profile.loginName + "?inclPrivs=true";

    const token = localStorage.getItem('auth_token');
    let loginHeader = new Headers();
    loginHeader.append("token", token);
    let config = {
        method: 'GET',
        headers: loginHeader
    };

    return dispatch => {
        return fetch('http://localhost:8080/befe/rest/' + endpoint, config)
            .then(response => {
                switch (response.status) {
                    case 200:
                        response.json()
                            .then( user => ( !user.active && dispatch(logoutUser()) ));
                        break;
                    default:
                        dispatch(logoutUser());
                }
            }).catch(err => console.log("Error: ", err))
    }
}

// user handling
export function getUsers() {
    return {
        [CALL_API]: {
            endpoint: 'management/users',
            authenticated: true,
            method: 'GET',
            types: [USER_LOADED, USER_FAILURE],
            json: {}
        }
    }
}

export function addUser(user) {
    return {
        [CALL_API]: {
            endpoint: 'management/users',
            authenticated: true,
            method: 'POST',
            types: [USER_ADDED, USER_FAILURE],
            json: user
        }
    }
}

export function updateUser(user) {
    return {
        [CALL_API]: {
            endpoint: 'management/users/'+user.loginName,
            authenticated: true,
            method: 'PUT',
            types: [USER_UPDATED, USER_FAILURE],
            json: JSON.stringify(user)
        }
    }
}

export function deleteUser(user) {
    return {
        [CALL_API]: {
            endpoint: 'management/users/'+user,
            authenticated: true,
            method: 'DELETE',
            types: [USER_DELETED, USER_FAILURE],
            json: user
        }
    }
}
