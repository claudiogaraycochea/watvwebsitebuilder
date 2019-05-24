import React, { Component } from 'react';
//import logo from './logo.svg';
import './Main.css';
import Header from '../header/Header';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Test from '../test/Test';
import Home from '../home/Home';
import Login from '../login/Login';
import WebsiteList from '../websiteList/WebsiteList';
import WebsiteEdit from '../websiteEdit/WebsiteEdit';
import WebsiteRun from '../pro/WebsiteRun';
import Registry from '../registry/Registry';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    sessionStorage.getItem('userToken') === null
      ? <Redirect to='/login'/>
      : <Component {...props} />
  )} />
)

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  updateHeader = () => {
    return 'updateheader true';
  }

  render() {
    console.log(this.props);
    return (
      <div className="main">
        {/* !=='/' ? <Header {...this.props} updateHeader={()=>this.updateHeader}/>:''*/}
        <Header {...this.props} updateHeader={()=>this.updateHeader}/>
        <div className="content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/test" component={Test} />
              <Route exact path="/login" component={Login} />
              <Route path="/registry" component={Registry} />
              <Route path="/pro/:websiteId" component={WebsiteRun} />
              <PrivateRoute path='/websitelist' component={WebsiteList} />
              <PrivateRoute path="/websiteEdit/:websiteId" component={WebsiteEdit} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default Main;