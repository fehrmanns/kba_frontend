/*eslint-disable no-unused-vars*/
import  React, { Component } from 'react';
/*eslint-enable no-unused-vars*/
import { Button } from 'react-bootstrap';
import './app.css';


class app extends Component {

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <p className="app-intro">
          To get started, edit <code>src/app.js</code> and save to reload.
        </p>
        <Button bsStyle="primary">Bootstrap Button</Button>
      </div>
    );
  }
}

export default app;
