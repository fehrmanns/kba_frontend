import {CALL_API} from "./middleware/api";
import {getLoginName} from "./utilities/storage";
// There are three possible states for our login
// process and we need actions for each of them
export const SERVER_ERROR = "SERVER_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAILURE = "TOKEN_FAILURE";

export const USER_LOADED = "USER_LOADED";
export const USER_ADDED = "USER_ADDED";
export const USER_DELETED = "USER_DELETED";
export const USER_UPDATED = "USER_UPDATED";
export const USER_FAILURE = "USER_FAILURE";

function serverError(message) {
    return {
        type: SERVER_ERROR,
        message,
    };
}

// login & logout handling
function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds,
    };
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user,
    };
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true,
    };
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
    };
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem("profile");
        localStorage.removeItem("loginName");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    const encodeLogin = `Basic ${btoa(`${creds.username}:${creds.password}`)}`;
    const loginHeader = new Headers();
    loginHeader.append("authentication", encodeLogin);
    const config = {
        method: "GET",
        headers: loginHeader,
    };

    return (dispatch) => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));

        return fetch("http://localhost:8080/befe/rest/login", config)
            .then((response) => {
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
                                    return Promise.reject(user);
                                }
                                // If login was successful, set the token in local storage
                                localStorage.setItem("profile", JSON.stringify(user.kbaUser));
                                localStorage.setItem("loginName", JSON.stringify(user.kbaUser.loginName));
                                localStorage.setItem("auth_token", user.authtoken);
                                localStorage.setItem("refresh_token", user.refreshtoken);

                                // Dispatch the success action
                                dispatch(receiveLogin(user));
                            });
                        break;
                    case 400:
                        dispatch(loginError("400"));
                        break;
                    case 401:
                        dispatch(loginError("401"));
                        break;
                    case 500:
                        console.error("500 Some server error");
                        dispatch(serverError(response.status));
                        break;
                    default:
                        console.warn("Some uncatched server response:", response.status);
                        dispatch(serverError(response.status));
                }
            }).catch(err => dispatch(serverError(err)));
    };
}

export function probeToken() {
    const loginName = getLoginName();
    const endpoint = `management/users/${loginName}?inclPrivs=true`;

    return {
        [CALL_API]: {
            endpoint,
            authenticated: true,
            method: "GET",
            types: [TOKEN_SUCCESS, TOKEN_FAILURE],
            json: {},
        },
    };
}

// app user handling
export function getUsers() {
    return {
        [CALL_API]: {
            endpoint: "management/users",
            authenticated: true,
            method: "GET",
            types: [USER_LOADED, USER_FAILURE],
            json: {},
        },
    };
}

export function addUser(user) {
    return {
        [CALL_API]: {
            endpoint: "management/users",
            authenticated: true,
            method: "POST",
            types: [USER_ADDED, USER_FAILURE],
            json: user,
        },
    };
}

export function updateUser(user) {
    return {
        [CALL_API]: {
            endpoint: `management/users/${user.loginName}`,
            authenticated: true,
            method: "PUT",
            types: [USER_UPDATED, USER_FAILURE],
            json: JSON.stringify(user),
        },
    };
}

export function deleteUser(userName) {
    return {
        [CALL_API]: {
            endpoint: `management/users/${userName}`,
            authenticated: true,
            method: "DELETE",
            types: [USER_DELETED, USER_FAILURE],
            json: userName,
        },
    };
}
