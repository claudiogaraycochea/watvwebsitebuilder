import React, { Component } from 'react';
import logo from '../../assets/logo-watv.svg';
//import iconMenu from '../../assets/icon-menu.svg';
import './Header.css';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstname: ''
    };
  }

  handleCloseSession = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userFirstname');
    sessionStorage.removeItem('userToken');
    this.props.history.push('/login');
  }


  static getDerivedStateFromProps(props, state) {
    return {
      userFirstname: sessionStorage.getItem('userFirstname'),
    };
  }

  render() {
    const buttonSession = (this.state.userFirstname!==null) ? <div className="menu-top-wrapper"><div className="item">Hi {this.state.userFirstname}!</div> <button className="btn small" onClick={()=>this.handleCloseSession()}><i className="icon-logout space" />Log Out</button></div> : null;
    return (
      <div className="header">
        <div className="logo-wrapper">
          <a href="/websiteList"><img src={logo} className="logo" alt="" /></a>
          <div className="title">
            Website Builder
          </div>
        </div>
        { buttonSession }
          { /* <img src={iconMenu} className="icon-menu" alt="Menu" /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userFirstname: state.userFirstname,
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));