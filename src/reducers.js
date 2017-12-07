import {combineReducers} from "redux";
import {
    SERVER_ERROR,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    TOKEN_SUCCESS, TOKEN_FAILURE,
    USER_LOADED, USER_DELETED, USER_ADDED, USER_UPDATED, USER_FAILURE,
    OPEN_PASSWORD_MODAL, CLOSE_PASSWORD_MODAL,
} from "./actions";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function error(state = {
    type: {},
}, action) {
    switch (action.type) {
        case SERVER_ERROR:
            return Object.assign({}, state, {
                type: action.message,
            });
        default:
            return state;
    }
}

function modals(state = {
    user: {},
    showPasswordModal: false,
}, action) {
    switch (action.type) {
        case OPEN_PASSWORD_MODAL:
            console.log("open", action.user);
            return Object.assign({}, state, {
                user: action.user,
                showPasswordModal: true,
            });
        case CLOSE_PASSWORD_MODAL:
            return Object.assign({}, state, {
                user: {},
                showPasswordModal: false,
            });
        default:
            return state;
    }
}

function auth(state = {
    isFetching: false,
    failureCounter: 0,
    errorMessage: "",
    isAuthenticated: !!localStorage.getItem("auth_token"),
    creds: {
        username: "",
        password: "",
    },
    user: {
        expired: true,
    },
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                errorMessage: "",
                creds: action.creds,
            });
        case LOGIN_SUCCESS:
            console.warn("200 (Login success)");
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                failureCounter: 0,
                errorMessage: "",
                authtoken: action.authtoken,
                user: action.user.kbaUser,
            });
        case TOKEN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: "",
                user: action.response,
            });
            // TODO: check this behaviour
        case TOKEN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message,
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                failureCounter: state.failureCounter + 1,
                errorMessage: action.message,
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                errorMessage: "",
            });
        default:
            return state;
    }
}

function token(state = {}, action) {
    switch (action.type) {
        case TOKEN_SUCCESS:
            return Object.assign({}, state, {
                tokenIsValid: true,
            });
        case TOKEN_FAILURE:
            return Object.assign({}, state, {
                tokenIsValid: false,
            });
        default:
            return state;
    }
}

function users(state = {
    isLoaded: false,
    list: [],
}, action) {
    // TODO: define all types
    switch (action.type) {
        case USER_LOADED:
            return Object.assign({}, state, {
                isLoaded: true,
                list: action.response.kbaUserDtos,
            });
        case USER_DELETED:
            return Object.assign({}, state, {});
        case USER_ADDED:
            return Object.assign({}, state, {});
        case USER_UPDATED:
            return Object.assign({}, state, {});
        case USER_FAILURE:
            return Object.assign({}, state, {});
        default:
            return state;
    }
}

// We combine the reducers here so that they
// can be left split apart above
const kbaApp = combineReducers({
    error,
    auth,
    token,
    users,
    modals,
});

export default kbaApp;
