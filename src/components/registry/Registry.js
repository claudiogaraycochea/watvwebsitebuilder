import React, { Component } from 'react';
import './Registry.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import * as commons from '../../commons/Commons';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      loading: false,
    };
  }

  componentWillMount () {
    //commons.redirectionBySession();
  }
  
  login = () => {
    const paramsData = `user_email=${this.state.email}&user_password=${this.state.password}`;
    axios.post(`${API_URL}lu`, paramsData )
      .then(response => {
        if(response.data.user_token!==undefined) {
          sessionStorage.setItem('userId',response.data.user_id);
          sessionStorage.setItem('userFirstname',response.data.user_firstname);
          sessionStorage.setItem('userToken',response.data.user_token);
          
          this.props.history.push("/websiteList");
        }
        else
          this.setState({message: 'Email or password is incorrect', loading: false });
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
    console.log('handleSubmit');
    if(this.state.email) {
      this.setState({ loading: true, message: '' }, () => {
        console.log('login');
        this.login();
      });      
    }
    else {
      this.setState({
        message: 'Email and password is required'
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="tertiary-style">
        <div className="container padding-20 center">
          <div className="center-wrapper">
            <div className="row">
              <h2>Registry</h2>
            </div>
            { commons.LoadingSpinner(this.state.loading) }
            { commons.Notification(this.state.message, 'alert') }
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
              <input
                name="password"
                type="password"
                className="inp"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder='Password'/>
            </div>
            <div className="row">
              <button className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
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