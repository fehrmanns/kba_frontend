import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import Sitebar from './Sitebar'
import Login from './../views/Login'
import Home from './../views/Home'
import { toggleItem as toggleSitebar, getItem as getStorage } from './../utilities/storage'
import {addLocaleData,IntlProvider} from 'react-intl';
import intlEN from 'react-intl/locale-data/en';
import intlDE from 'react-intl/locale-data/de';
import en from '../i18n/messages_en.json';
import de from '../i18n/messages_de.json';

addLocaleData([...intlEN, ...intlDE]);
//TODO: replace EN with the calculated language
let lang = "de"
const localeMessages = Object.assign( {} , en, de)
console.log("localeMessages:", localeMessages);
const langMsg = localeMessages[lang];
console.log("lanMsg:", langMsg);

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


  // Put any other imports below so that CSS from your
  // components takes precedence over default styles.
  
  

  render() {

    const application = <div className={(this.state.sitebar === "true") ? 'show container' : 'container'}>
      <Route exact path="/" component={Home} />
    </div>

    const login = <Route path="/" component={Login} />

    return (
      <IntlProvider key={lang} locale={lang} messages={langMsg}>
        <Router>
          <div className="mainframe">
            <Header toggleMenu={() => this.toggleMenu()} renderOnLogin={this.state.loginSuccess} />
            <div className="progress">
              <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                <span className="sr-only">45% Complete</span>
              </div>
            </div>

            {this.state.loginSuccess && <Sitebar show={this.state.sitebar} />}

            {this.state.loginSuccess ? application : login}
          </div>
        </Router>
      </IntlProvider>
    );
  }
};

export default Mainframe