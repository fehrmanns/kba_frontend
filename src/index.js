import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './utilities/registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Mainframe from './components/Mainframe';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

ReactDOM.render(<Mainframe />, document.getElementById('root'));
registerServiceWorker();
