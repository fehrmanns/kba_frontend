/*eslint-disable no-unused-vars*/
import  React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
/*eslint-enable no-unused-vars*/
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button bsStyle="primary">Bootstrap Button</Button>
      </div>
    );
  }
}

export default App;
