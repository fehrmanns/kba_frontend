
/* Login Uniform Resource Identifier */
const LURI = 'http://localhost:8080/befe/rest/';

function callApi(endpoint, authenticated, method) {

    let token = localStorage.getItem('auth_token') || null;
    let config = {};

    if (authenticated) {
        if (token) {
            config = {
                method: method,
                headers: { 'token': token }
            }
        } else {
            console.log("No token saved!")
        }
    }

    return fetch(LURI + endpoint, config)
        .then(response =>
            response.text().then(text => ({ text, response }))
        ).then(({ text, response }) => {
            if (!response.ok) {
                return Promise.reject(text)
            }

            return text
        }).catch(err => console.warn(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

    const callAPI = action[CALL_API]

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, types, authenticated } = callAPI;

    //const [requestType, successType, errorType] = types
    const [successType, errorType] = types

    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
    return callApi(endpoint, authenticated).then(
        response =>
            next({
                response,
                authenticated,
                type: successType
            }),
        error => next({
            error: error.message || 'There was an error.',
            type: errorType
        })
    )
}
