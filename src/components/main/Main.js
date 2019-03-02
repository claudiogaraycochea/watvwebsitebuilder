import React, { Component } from 'react';
//import logo from './logo.svg';
import './Main.css';
import Header from '../header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../login/Login';
import WebsiteList from '../websiteList/WebsiteList.js';
import WebsiteEdit from '../websiteEdit/WebsiteEdit.js';
import WebsiteRun from '../pro/WebsiteRun.js';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/websitelist" component={WebsiteList} />
                    <Route path="/websiteEdit/:websiteId" component={WebsiteEdit} />
                    <Route path="/pro/:websiteId" component={WebsiteRun} />
                    {/*<PrivateRoute path='/websitelist' component={WebsiteList} />*/}
                </Switch>
            </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default Main;