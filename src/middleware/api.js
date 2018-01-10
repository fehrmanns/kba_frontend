import {logoutUser} from "./../actions";
/* Login Uniform Resource Identifier */
const LURI = "http://localhost:8080/befe/rest/";

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`);
}

function callApi(endpoint, authenticated, method, json, store) {
    const token = localStorage.getItem("auth_token") || null;
    const loginHeader = new Headers();
    let config = {};

    if (authenticated) {
        if (token) {
            loginHeader.append("token", token);
        } else {
            console.log("No token saved!");
        }
    }
    if (method === "POST" || method === "PUT") {
        loginHeader.append("Content-Type", "application/json");
        config = Object.assign({}, config, {body: json});
    }

    config = Object.assign({}, config, {
        method,
        headers: loginHeader,
    });

    // TODO: create good switch for request
    if (method === "GET") {
        return fetch(LURI + endpoint, config)
            .then((response) => {
                if (response.status === 200) { return response; }
                if (response.status === 401) { store.dispatch(logoutUser()); }
                const errorObject = {
                    status: response.status,
                    message: response.headers.get("kba_exception"),
                };
                return Promise.reject(errorObject);
            })
            .then(response =>
                response.json().then(json => ({json, response}))).then(({json, response}) => {
                if (!response.ok) { return Promise.reject(json); }
                return json;
            })
            .catch((err) => {
                console.log("api-json:", err);
                throw err;
            });
    }

    return fetch(LURI + endpoint, config)
        .then((response) => {
            if (response.status === 200 || response.status === 201) { return response; }
            if (response.status === 401) { store.dispatch(logoutUser()); }
            const errorObject = {
                status: response.status,
                message: response.headers.get("kba_exception"),
            };
            return Promise.reject(errorObject);
        })
        .then(response =>
            response.text().then(text => ({text, response}))).then(({text, response}) => {
            if (!response.ok) {
                return Promise.reject(text);
            }
            return text;
        })
        .catch((err) => {
            console.warn("api-others:", err);
            throw err;
        });
}

export const CALL_API = Symbol("Call API");

function formatEndpoint(endpoint, pathParam, queryParam) {
    let formattedEndpoint = endpoint;
    if (pathParam) {
        const pathParamEncoded = fixedEncodeURIComponent(pathParam);
        formattedEndpoint = formattedEndpoint.concat("/", pathParamEncoded);
    }

    if (queryParam && queryParam.length > 0) {
        formattedEndpoint += "?";
        for (let i = 0; i < queryParam.length; i += 1) {
            formattedEndpoint += queryParam[i];
            if (i < queryParam.length - 1) {
                formattedEndpoint += "&";
            }
        }
    }
    console.log("formattedEndpoint", formattedEndpoint);
    return formattedEndpoint;
}

export default store => next => (action) => {
    const callAPI = action[CALL_API];

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === "undefined") { return next(action); }
    const {
        endpoint, pathParam, queryParams, types, authenticated, method, json,
    } = callAPI;

    const [requestType, successType, errorType] = types;
    const formattedEndpoint = formatEndpoint(endpoint, pathParam, queryParams);

    next({
        type: requestType,
    });

    return callApi(formattedEndpoint, authenticated, method, json, store).then(
        response =>
            next({
                response,
                type: successType,
            }),
        error => next({
            status: error.status,
            message: error.message || "There was an error.",
            type: errorType,
        }),
    );
};
