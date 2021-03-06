import {combineReducers} from "redux";
import {
    SERVER_ERROR, ERROR_RESET, LOGIN_ERROR_RESET,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE,
    USER_REQUEST, USER_LOADED, USER_DELETED, USER_ADDED, USER_UPDATED, USER_FAILURE,
    TYPE_REQUEST, TYPE_LOADED, TYPE_DELETED, TYPE_ADDED, TYPE_UPDATED, TYPE_BYNAME_LOADED, TYPE_FAILURE,
    OPEN_PASSWORD_MODAL, CLOSE_PASSWORD_MODAL, OPEN_SELECT_ICON_MODAL, CLOSE_SELECT_ICON_MODAL,
    UNITS_REQUEST, UNITS_LOADED, UNIT_REQUEST, UNIT_ADD_REQUEST, UNIT_ADDED, UNIT_DELETED, UNIT_UPDATE_REQUEST,
    RESET_UNIT_UPDATE_STATUS, UNIT_UPDATED, UNIT_FAILURE, UNIT_LOADED, UNIT_SELECTED, ROOTUNIT_LOADED, SET_RIGHTS,
    SET_EXPIRED_VALUE, PASSWORD_REQUEST,
    CATEGORY_REQUEST, CATEGORY_LOADED, CATEGORY_ADDED, CATEGORY_UPDATED, CATEGORY_DELETED, CATEGORY_FAILURE,
    ENGINESETTINGS_REQUEST, ENGINESETTINGS_FAILURE, ENGINESETTINGS_LOADED, ENGINESETTING_CREATED, ENGINESETTING_UPDATED,
    ENGINESETTING_DELETED,
    ADMINJOBLIST_LOADED, ADMINJOBLIST_FAILURE, OWNJOBLIST_REQUEST, OWNJOBLIST_LOADED,
    OWNJOBLIST_FAILURE, OWN_GROUPJOBS_LOADED, ADMIN_GROUPJOBS_LOADED, OWN_GROUP, ADMIN_GROUP, OPEN_JOB_INFO_MODAL,
    CLOSE_JOB_INFO_MODAL, ADMINJOB_LOADED, OWNJOB_LOADED, ADMINJOBLIST_REQUEST, OWNGROUP_LOADED, ADMINGROUP_LOADED,
} from "./actions";

import * as joblistUtilities from "./utilities/reducer/joblistUtilities";

function createDefaultRights() {
    const paths = ["users", "org-unit-types", "org-units", "categories", "engine-settings", "imports", "own-jobs", "/own-jobs/job-groups", "jobs", "/jobs/job-groups"];

    const rightsFormatted = {
    };
    for (let i = 0; i < paths.length; i += 1) {
        rightsFormatted[paths[i]] = {
            delete: false,
            put: false,
            post: false,
            get: false,
            hasPermissions() {
                return !!Object.values(this).filter(value => value === true).length;
            },

        };
    }

    const pathMapping = {
        usersettings: ["users"],
        organisationsettings: ["org-unit-types", "org-units"],
        categorysettings: ["categories"],
        importsettings: ["engine-settings"],
        recordings: ["imports"],
        joblist: ["own-jobs", "jobs", "/own-jobs/job-groups", "/jobs/job-groups"],
        hasPermissionsForPath(path) {
            const length = this[path] ? this[path].length : 0;
            for (let i = 0; i < length; i += 1) {
                if (rightsFormatted[this[path][i]].hasPermissions()) {
                    return true;
                }
            }
            return false;
        },
    };
    rightsFormatted.pathMapping = pathMapping;
    return rightsFormatted;
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function error(state = {
    server: {},
    unit: {},
    user: {},
    unittypes: {},
    categories: {},
    enginesettings: {},
    errorMessage: "",
}, action) {
    switch (action.type) {
        case SERVER_ERROR:
            return Object.assign({}, state, {
                server: action.message,
            });
        case UNIT_FAILURE:
            return Object.assign({}, state, {
                unit: {
                    message: action.message,
                    status: action.status,
                },
            });
        case USER_FAILURE:
            return Object.assign({}, state, {
                user: {
                    message: action.message,
                    status: action.status,
                },
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                errorMessage: action.message,
            });
        case TOKEN_FAILURE:
            return Object.assign({}, state, {
                errorMessage: action.message,
            });
        case TYPE_FAILURE:
            return Object.assign({}, state, {
                unittypes: {
                    message: action.message,
                    status: action.status,
                },
            });
        case CATEGORY_FAILURE:
            return Object.assign({}, state, {
                categories: {
                    message: action.message,
                    status: action.status,
                },
            });
        case ENGINESETTINGS_FAILURE:
            return Object.assign({}, state, {
                enginesettings: {
                    message: action.message,
                    status: action.status,
                },
            });
        case ERROR_RESET:
            return Object.assign({}, state, {
                server: {},
                unit: {},
                user: {},
                unittypes: {},
            });
        case LOGIN_ERROR_RESET:
            return Object.assign({}, state, {
                errorMessage: "",
            });
        default:
            return state;
    }
}

function modals(state = {
    user: {},
    setIcon: () => {},
    showPasswordModal: false,
    showSelectIconModal: false,
    showJobInfoModal: false,
    backdrop: true,
    job: {},
}, action) {
    switch (action.type) {
        case OPEN_PASSWORD_MODAL:
            return Object.assign({}, state, {
                user: action.user,
                showPasswordModal: true,
                backdrop: action.backdrop,
            });
        case CLOSE_PASSWORD_MODAL:
            return Object.assign({}, state, {
                user: {},
                showPasswordModal: false,
                backdrop: true,
            });
        case OPEN_SELECT_ICON_MODAL:
            return Object.assign({}, state, {
                setIcon: action.method,
                showSelectIconModal: true,
                backdrop: true,
            });
        case CLOSE_SELECT_ICON_MODAL:
            return Object.assign({}, state, {
                setIcon: () => {},
                showSelectIconModal: false,
                backdrop: true,
            });
        case OPEN_JOB_INFO_MODAL:
            return Object.assign({}, state, {
                job: action.job,
                showJobInfoModal: true,
                backdrop: true,
            });
        case CLOSE_JOB_INFO_MODAL:
            return Object.assign({}, state, {
                showJobInfoModal: false,
                backdrop: true,
                job: {},
            });
        default:
            return state;
    }
}

function auth(state = {
    isFetching: false,
    failureCounter: 0,
    isAuthenticated: !!localStorage.getItem("auth_token"),
    creds: {
        username: "",
        password: "",
    },
    user: {
        expired: false,
        kbaRestServices: [],
    },
    rights: createDefaultRights(),
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                creds: action.creds,
            });
        case LOGIN_ERROR_RESET:
            return Object.assign({}, state, {
                isFetching: false,
                creds: action.creds,
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                failureCounter: 0,
                authtoken: action.authtoken,
                user: action.user.kbaUser,
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                failureCounter: state.failureCounter + 1,
                rights: createDefaultRights(),
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                rights: createDefaultRights(),
            });
        case TOKEN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: true,
            });
        case TOKEN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: action.response,
            });
        // TODO: check this behaviour
        case TOKEN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                rights: createDefaultRights(),
            });
        case SET_RIGHTS:
            return Object.assign({}, state, {
                isFetching: false,
                rights: action.rights,
            });
        case SET_EXPIRED_VALUE:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    expired: action.expired,
                }),
            });
        default:
            return state;
    }
}
// TODO: check if it's obsolete
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

// TODO: check if isLoaded is obsolete
function users(state = {
    isFetching: false,
    isLoaded: false,
    list: [],
}, action) {
    // TODO: define/check all types
    switch (action.type) {
        case USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isLoaded: false,
            });
        case PASSWORD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case USER_LOADED:
            return Object.assign({}, state, {
                isFetching: false,
                isLoaded: true,
                list: action.response.kbaUserDtos,
            });
        case USER_DELETED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case USER_ADDED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case USER_UPDATED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case USER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        default:
            return state;
    }
}

function unittypes(state = {
    isFetching: false,
    isLoaded: false,
    list: [],
    loadedType: {},
}, action) {
    switch (action.type) {
        case TYPE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isLoaded: false,
            });
        case TYPE_LOADED:
            return Object.assign({}, state, {
                isFetching: false,
                isLoaded: true,
                list: action.response.kbaOuTypeDtos,
            });
        case TYPE_DELETED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case TYPE_ADDED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case TYPE_UPDATED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case TYPE_BYNAME_LOADED:
            return Object.assign({}, state, {
                loadedType: [action.response],
                isFetching: false,
            });
        case TYPE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        default:
            return state;
    }
}

function units(state = {
    isFetching: false,
    list: [],
    rootUnit: {},
    unitTree: {},
    selectedUnit: {},
    typeNames: [],
    updateSuccess: false,
    orgUnitToUpdate: "",
    orgUnitUpdate: {},
    orgUnitChildUpdate: {},
}, action) {
    switch (action.type) {
        case ROOTUNIT_LOADED:
            return Object.assign({}, state, {
                isFetching: false,
                rootUnit: action.response.kbaOuDtos[0],
            });
        case UNITS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isLoaded: false,
            });
        case UNITS_LOADED:
            return Object.assign({}, state, {
                list: action.response.kbaOuDtos,
                isFetching: false,
            });
        case UNIT_SELECTED:
            return Object.assign({}, state, {
                selectedUnit: action.unit,
                isFetching: false,
            });
        case UNIT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                unitTree: {},
            });
        case UNIT_ADD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                orgUnitToUpdate: action.orgUnitToUpdate,
                orgUnitChildUpdate: action.orgUnitChildUpdate,
                updateSuccess: false,
            });
        case UNIT_ADDED:
            return Object.assign({}, state, {
                isFetching: false,
                updateSuccess: true,
            });
        case UNIT_LOADED:
            return Object.assign({}, state, {
                unitTree: action.response,
                isFetching: false,
                typeNames: [action.response.kbaOuTypeName],
            });
        case UNIT_DELETED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case UNIT_UPDATE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                updateSuccess: false,
                orgUnitToUpdate: action.orgUnitToUpdate,
                orgUnitUpdate: action.orgUnitUpdate,
            });
        case UNIT_UPDATED:
            return Object.assign({}, state, {
                isFetching: false,
                updateSuccess: true,
            });
        case UNIT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                updateSuccess: false,
            });
        case RESET_UNIT_UPDATE_STATUS:
            return Object.assign({}, state, {
                isFetching: false,
                updateSuccess: false,
                orgUnitToUpdate: "",
                orgUnitUpdate: {},
                orgUnitChildUpdate: {},
            });
        default:
            return state;
    }
}

function categories(state = {
    isFetching: false,
    bundle: [],
}, action) {
    switch (action.type) {
        case CATEGORY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case CATEGORY_LOADED:
            return Object.assign({}, state, {
                isFetching: false,
                bundle: action.response.kbaCategoryDtos,
            });
        case CATEGORY_ADDED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case CATEGORY_UPDATED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case CATEGORY_DELETED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case CATEGORY_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        default:
            return state;
    }
}
function enginesettings(state = {
    isFetching: false,
    list: [],
    isLoaded: false,
}, action) {
    switch (action.type) {
        case ENGINESETTINGS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isLoaded: false,
            });
        case ENGINESETTINGS_LOADED:
            return Object.assign({}, state, {
                list: action.response.kbaEngineSettingsDtos,
                isFetching: false,
                isLoaded: true,
            });
        case ENGINESETTING_CREATED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case ENGINESETTING_UPDATED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case ENGINESETTING_DELETED:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case ENGINESETTINGS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        default:
            return state;
    }
}

function ownjoblist(state = {
    isFetching: false,
    joblist: [],
    isLoaded: false,
    groupToFetch: "",
}, action) {
    switch (action.type) {
        case OWNJOBLIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isLoaded: false,
            });
        case OWNJOBLIST_LOADED:
            return Object.assign({}, state, {
                joblist: joblistUtilities.determineGroupProgress(action.response.kbaJobDtos),
                isFetching: false,
                isLoaded: true,
            });
        case OWN_GROUPJOBS_LOADED:
            return Object.assign({}, state, {
                joblist: joblistUtilities.addChildrenToGroup(state.groupToFetch, action.response.kbaJobDtos, state.joblist),
                isFetching: false,
                isLoaded: true,
                groupToFetch: "",
            });
        case OWN_GROUP:
            return Object.assign({}, state, {
                groupToFetch: action.groupToFetch,
            });
        case OWNJOB_LOADED:
            return Object.assign({}, state, {
                joblist: joblistUtilities.refreshJob(action.response, state.joblist, false),
                isFetching: false,
                isLoaded: true,
            });
        case OWNGROUP_LOADED:
            return Object.assign({}, state, {
                joblist: joblistUtilities.refreshJob(joblistUtilities.determineGroupProgress(action.response.kbaJobDtos)[0], state.joblist, true),
                isFetching: false,
                isLoaded: true,
            });
        case OWNJOBLIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        default:
            return state;
    }
}

function adminjoblist(state = {
    isFetching: false,
    joblist: [],
    isLoaded: false,
    groupToFetch: "",
}, action) {
    switch (action.type) {
        case ADMINJOBLIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isLoaded: false,
            });
        case ADMINJOBLIST_LOADED:
            return Object.assign({}, state, {
                joblist: joblistUtilities.determineGroupProgress(action.response.kbaJobDtos),
                isFetching: false,
                isLoaded: true,
            });
        case ADMIN_GROUPJOBS_LOADED:
            return Object.assign({}, state, {
                joblist: joblistUtilities.addChildrenToGroup(state.groupToFetch, action.response.kbaJobDtos, state.joblist),
                isFetching: false,
                isLoaded: true,
                groupToFetch: "",
            });
        case ADMIN_GROUP:
            return Object.assign({}, state, {
                groupToFetch: action.groupToFetch,
            });
        case ADMINJOB_LOADED:
            return Object.assign({}, state, {
                joblist: joblistUtilities.refreshJob(action.response, state.joblist, false),
                isFetching: false,
                isLoaded: true,
            });
        case ADMINGROUP_LOADED:
            return Object.assign({}, state, {
                joblist: joblistUtilities.refreshJob(joblistUtilities.determineGroupProgress(action.response.kbaJobDtos)[0], state.joblist, true),
                isFetching: false,
                isLoaded: true,
            });
        case ADMINJOBLIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
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
    unittypes,
    modals,
    units,
    categories,
    enginesettings,
    ownjoblist,
    adminjoblist,
});

export default kbaApp;
