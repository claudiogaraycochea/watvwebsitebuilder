import React, { Component } from 'react';
//import logo from './logo.svg';
import './Main.css';
import Header from '../header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../login/Login';
import WebsiteList from '../websiteList/WebsiteList.js';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/:websiteLinkname" component={WebsiteList} />  
                </Switch>
            </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default Main;