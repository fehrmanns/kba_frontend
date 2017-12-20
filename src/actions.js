import {CALL_API} from "./middleware/api";
import {getLoginName} from "./utilities/storage";
// There are three possible states for our login
// process and we need actions for each of them
export const SERVER_ERROR = "SERVER_ERROR";
export const ERROR_RESET = "ERROR_RESET";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_RESET_ERROR = "LOGIN_RESET_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAILURE = "TOKEN_FAILURE";

export const USER_REQUEST = "USER_REQUEST";
export const USER_LOADED = "USER_LOADED";
export const USER_ADDED = "USER_ADDED";
export const USER_DELETED = "USER_DELETED";
export const USER_UPDATED = "USER_UPDATED";
export const USER_FAILURE = "USER_FAILURE";

export const TYPE_REQUEST = "TYPE_REQUEST";
export const TYPE_LOADED = "TYPE_LOADED";
export const TYPE_ADDED = "TYPE_ADDED";
export const TYPE_DELETED = "TYPE_DELETED";
export const TYPE_UPDATED = "TYPE_UPDATED";
export const TYPE_FAILURE = "TYPE_FAILURE";
export const TYPE_BYNAME_LOADED = "TYPE_BYNAME_LOADED";

export const OPEN_PASSWORD_MODAL = "OPEN_PASSWORD_MODAL";
export const CLOSE_PASSWORD_MODAL = "CLOSE_PASSWORD_MODAL";
export const OPEN_SELECT_ICON_MODAL = "OPEN_SELECT_ICON_MODAL";
export const CLOSE_SELECT_ICON_MODAL = "CLOSE_SELECT_ICON_MODAL";

export const UNITS_REQUEST = "UNITS_REQUEST";
export const UNITS_LOADED = "UNITS_LOADED";
export const ROOTUNIT_LOADED = "ROOTUNIT_LOADED";
export const UNIT_REQUEST = "UNIT_REQUEST";
export const UNIT_LOADED = "UNIT_LOADED";
export const UNIT_ADDED = "UNIT_ADDED";
export const UNIT_DELETED = "UNIT_DELETED";
export const UNIT_UPDATED = "UNIT_UPDATED";
export const UNIT_FAILURE = "UNIT_FAILURE";
export const UNIT_SELECTED = "UNIT_SELECTED";
export const UNIT_ROOT = "UNIT_ROOT";

function serverError(message) {
    return {
        type: SERVER_ERROR,
        message,
    };
}

export function resetError() {
    return {
        type: ERROR_RESET,
    };
}

// modal handling
export function openPasswordModal(user, backdrop) {
    const backdropType = backdrop || true;
    return {
        type: OPEN_PASSWORD_MODAL,
        backdrop: backdropType,
        user,
    };
}

export function closePasswordModal() {
    return {
        type: CLOSE_PASSWORD_MODAL,
    };
}

export function openSelectIconModal(callback) {
    return {
        type: OPEN_SELECT_ICON_MODAL,
        backdrop: true,
        method: callback,
    };
}

export function selectUnit(unit) {
    return {
        type: UNIT_SELECTED,
        unit,
    };
}

export function closeSelectIconModal() {
    return {
        type: CLOSE_SELECT_ICON_MODAL,
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

export function resetLoginError(message) {
    return {
        type: LOGIN_RESET_ERROR,
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
                            .then(({user}) => {
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
                                return dispatch(receiveLogin(user));
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
            types: [TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE],
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
            types: [USER_REQUEST, USER_LOADED, USER_FAILURE],
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
            types: [USER_REQUEST, USER_ADDED, USER_FAILURE],
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
            types: [USER_REQUEST, USER_UPDATED, USER_FAILURE],
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
            types: [USER_REQUEST, USER_DELETED, USER_FAILURE],
            json: userName,
        },
    };
}

export function addUnitType(unitType) {
    return {
        [CALL_API]: {
            endpoint: "management/org-unit-types",
            authenticated: true,
            method: "POST",
            types: [TYPE_REQUEST, TYPE_ADDED, TYPE_FAILURE],
            json: unitType,
        },
    };
}

export function updateUnitType(typeName, unitType) {
    return {
        [CALL_API]: {
            endpoint: `management/org-unit-types/${typeName}`,
            authenticated: true,
            method: "PUT",
            types: [TYPE_REQUEST, TYPE_UPDATED, TYPE_FAILURE],
            json: JSON.stringify(unitType),
        },
    };
}

export function deleteUnitType(unitType) {
    return {
        [CALL_API]: {
            endpoint: `management/org-unit-types/${unitType}`,
            authenticated: true,
            method: "DELETE",
            types: [TYPE_REQUEST, TYPE_DELETED, TYPE_FAILURE],
            json: unitType,
        },
    };
}

export function getUnitType(typeName) {
    return {
        [CALL_API]: {
            endpoint: `management/org-unit-types/${typeName}`,
            authenticated: true,
            method: "GET",
            types: [TYPE_REQUEST, TYPE_BYNAME_LOADED, TYPE_FAILURE],
            json: {},
        },
    };
}

export function getUnitTypes() {
    return {
        [CALL_API]: {
            endpoint: "management/org-unit-types",
            authenticated: true,
            method: "GET",
            types: [TYPE_REQUEST, TYPE_LOADED, TYPE_FAILURE],
            json: {},
        },
    };
}

export function getAllOrgUnits() {
    return {
        [CALL_API]: {
            endpoint: "management/org-units",
            authenticated: true,
            method: "GET",
            types: [UNITS_REQUEST, UNITS_LOADED, UNIT_FAILURE],
            json: {},
        },
    };
}

function requestOrgUnit() {
    return {
        type: UNIT_REQUEST,
        isFetching: true,
    };
}

export function getOrgUnit(unitName) {
    requestOrgUnit();
    return {
        [CALL_API]: {
            endpoint: `management/org-units/${unitName}`,
            authenticated: true,
            method: "GET",
            types: [UNITS_REQUEST, UNIT_LOADED, UNIT_FAILURE],
            json: {},
        },
    };
}

export function deleteOrgUnit(unitName) {
    return {
        [CALL_API]: {
            endpoint: `management/org-units/${unitName}`,
            authenticated: true,
            method: "DELETE",
            types: [UNITS_REQUEST, UNIT_DELETED, UNIT_FAILURE],
            json: {},
        },
    };
}

export function createOrgUnit(unit) {
    return {
        [CALL_API]: {
            endpoint: "management/org-units/",
            authenticated: true,
            method: "POST",
            types: [UNITS_REQUEST, UNIT_ADDED, UNIT_FAILURE],
            json: JSON.stringify(unit),
        },
    };
}

export function updateOrgUnit(unitName, unit) {
    return {
        [CALL_API]: {
            endpoint: `management/org-units/${unitName}`,
            authenticated: true,
            method: "PUT",
            types: [UNITS_REQUEST, UNIT_UPDATED, UNIT_FAILURE],
            json: JSON.stringify(unit),
        },
    };
}

export function getRootUnit() {
    return {
        [CALL_API]: {
            endpoint: `management/org-units?rootNodeOnly=true`,
            authenticated: true,
            method: "GET",
            types: [UNITS_REQUEST, ROOTUNIT_LOADED, UNIT_FAILURE],
            json: {},
        },
    };
}
