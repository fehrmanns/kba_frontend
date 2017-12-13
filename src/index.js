import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./css/index.css";
import registerServiceWorker from "./utilities/registerServiceWorker";
import Mainframe from "./components/Mainframe";
import api from "./middleware/api";
import kbaApp from "./reducers";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

// https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);
const store = createStoreWithMiddleware(
    kbaApp,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <Mainframe />
    </Provider>,
    rootElement,
);

registerServiceWorker();
