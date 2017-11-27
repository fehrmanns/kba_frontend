import {combineReducers} from "redux";
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    TOKEN_SUCCESS, TOKEN_FAILURE,
    USER_LOADED, USER_DELETED, USER_ADDED, USER_UPDATED, USER_FAILURE,
} from "./actions";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem("auth_token"),
}, action) {
    switch (action.type) {
    case LOGIN_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
            user: action.creds,
        });
    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            errorMessage: "",
        });
    case LOGIN_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            errorMessage: action.message,
        });
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: true,
            isAuthenticated: false,
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

function users(state = {}, action) {
    switch (action.type) {
    case USER_LOADED:
        return Object.assign({}, state, {
            isLoaded: true,
            list: action.response.kbaUserDtos,
        });
    case USER_DELETED:
        return Object.assign({}, state, {

        });
    case USER_ADDED:
        return Object.assign({}, state, {

        });
    case USER_UPDATED:
        return Object.assign({}, state, {

        });
    case USER_FAILURE:
        return Object.assign({}, state, {

        });
    default:
        return state;
    }
}

// We combine the reducers here so that they
// can be left split apart above
const kbaApp = combineReducers({
    auth,
    token,
    users,
});

export default kbaApp;
