/* Login Uniform Resource Identifier */
const LURI = "http://localhost:8080/befe/rest/";

function callApi(endpoint, authenticated, method, json) {
    const token = localStorage.getItem("auth_token") || null;
    const loginHeader = new Headers();
    let config = {};

    // TODO: check if token is valid!

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

    console.log("config", config);

    // TODO: create good switch for request
    if (method === "GET") {
        return fetch(LURI + endpoint, config)
            .then(response =>
                response.json().then(json => ({json, response}))).then(({json, response}) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            }).catch(err => console.warn(err));
    }
    return fetch(LURI + endpoint, config)
        .then(response =>
            response.text().then(text => ({ text, response }))).then(({ text, response }) => {
            if (!response.ok) {
                return Promise.reject(text);
            }
            return text;
        }).catch(err => console.warn(err));
}

export const CALL_API = Symbol("Call API");

export default store => next => (action) => {
    const callAPI = action[CALL_API];

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === "undefined") {
        return next(action);
    }

    const {
        endpoint, types, authenticated, method, json,
    } = callAPI;

    // const [requestType, successType, errorType] = types
    const [successType, errorType] = types;

    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
    return callApi(endpoint, authenticated, method, json).then(
        response =>
            next({
                response,
                authenticated,
                type: successType,
            }),
        error => next({
            error: error.message || "There was an error.",
            type: errorType,
        }),
    );
};
