import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import Sitebar from './Sitebar'
import Home from './../views/Home'
import {toggleItem as toggleSitebar, getItem as getStorage} from './../utilities/storage'

class Mainframe extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      sitebar: getStorage("sitebar") 
    };
  }
  
  toggleMenu() {
    toggleSitebar("sitebar");
    this.setState({
      sitebar: getStorage("sitebar") 
    })
  } 

  render() {
    return (
      <Router>
        <div className="mainframe">
          <Header toggleMenu={() => this.toggleMenu()} />
          <Sitebar show={this.state.sitebar} />

          <div className={(this.state.sitebar === "true") ? 'show container' : 'container'}>
            <Route exact path="/" component={Home} />
          </div>
        </div>
      </Router>
    );
  }
};

export default Mainframe