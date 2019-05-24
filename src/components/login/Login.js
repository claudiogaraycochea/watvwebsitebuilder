import React, { Component } from 'react';
import './Login.css';
import Footer from '../footer/Footer';
import axios from 'axios';
import { API_URL } from '../../constants';
import * as commons from '../../commons/Commons';
import { openSession } from '../../actions';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: {
        text: '',
        typeMessage: 'alert',
      },
      loading: false,
    };
  }
  
  login = () => {
    const paramsData = `user_email=${this.state.email}&user_password=${this.state.password}`;
    axios.post(`${API_URL}lu`, paramsData )
      .then(response => {
        if(response.data.user_token!==undefined) {
          sessionStorage.setItem('userId',response.data.user_id);
          sessionStorage.setItem('userFirstname',response.data.user_firstname);
          sessionStorage.setItem('userToken',response.data.user_token);
          this.props.openSession(response.data.user_firstname);
          this.props.history.push("/websiteList");
        }
        else
          this.setState({
            message: {
              text: 'Email or password is incorrect',
              typeMessage: 'alert',
            }
            , loading: false });
      })
      .catch(error => {});
  }

  handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    if(this.state.email) {
      this.setState({ loading: true, message: '' }, () => {
        this.login();
      });      
    }
    else {
      this.setState({
        message: {
          text: 'Email and password is required',
          typeMessage: 'alert',
        }
      });
    }
  }

  render() {
    return (
      <div className="tertiary-style">
        <div className="container padding-20 center">
          <div className="center-wrapper">
            <div className="row">
              <h2>Login</h2>
            </div>
            <div className="row">
              <input
                name="email"
                type="text"
                className="inp"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder='Email'/>
            </div>
            <div className="row">
              <input
                name="password"
                type="password"
                className="inp"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder='Password'/>
            </div>
            <div className="row">
              <button className="btn btn-primary" onClick={this.handleSubmit}><i className="icon-key space"/>Login</button>
            </div>
          </div>
        </div>
        { commons.LoadingSpinner(this.state.loading) }
        { commons.Notification(this.state.message.text, this.state.message.typeMessage) }
        <Footer className="footer"/>    
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    openSession(userFirstname) {
      dispatch(openSession(userFirstname));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);