import React, { Component } from 'react';
import './Login.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  
  login= () => {
    this.props.history.push("/WebsiteList");
  }

  render() {
    return (
      <div className="primary-style">
        <div className="container padding-20 center">
          <div className="box-wrapper">
            <div className="row">
              <h2>Login</h2>
            </div>
            <div className="row">
              <input type="text" className="inp" placeholder="Email"/>
            </div>
            <div className="row">
              <input type="password" className="inp" placeholder="Password"/>
            </div>
            <div className="row">
              <button className="btn btn-primary" onClick={this.login}>Login</button>
            </div>
            <div className="row">
              <Link to="/WebsiteList">Forgot Password</Link>
            </div>
          </div>
        </div>
        <Footer className="footer"/>    
      </div>
    );
  }
}

export default Welcome;