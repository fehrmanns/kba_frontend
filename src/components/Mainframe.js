import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import Sitebar from './Sitebar'
import Login from './../views/Login'
import Home from './../views/Home'
import {toggleItem as toggleSitebar, getItem as getStorage} from './../utilities/storage'

class Mainframe extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      sitebar: getStorage("sitebar"),
      loginSuccess: false
    };
  }
  
  toggleMenu() {
    toggleSitebar("sitebar");
    this.setState({
      sitebar: getStorage("sitebar") 
    })
  } 

  render() {

    const application = <div className={(this.state.sitebar === "true") ? 'show container' : 'container'}>
                        <Route exact path="/" component={Home} />
                      </div>

    const login = <Route path="/" component={Login} />

    return (
      <Router>
        <div className="mainframe">
          <Header toggleMenu={() => this.toggleMenu()} />
          <div className="progress">
            <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
              <span className="sr-only">45% Complete</span>
            </div>
          </div>

          { this.state.loginSuccess && <Sitebar show={this.state.sitebar} /> }

          { this.state.loginSuccess ? application : login }
        </div>
      </Router>
    );
  }
};

export default Mainframe