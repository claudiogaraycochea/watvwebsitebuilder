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
    const buttonSession = (this.state.userFirstname!==null) ? <div>Hi {this.state.userFirstname}! <button className="btn small" onClick={()=>this.handleCloseSession()}>Log Out</button></div> : null;
    return (
      <div className="header">
        <a href="/websiteList"><img src={logo} className="logo" alt="" /></a>
        <div className="search">
          Website Builder
        </div>
        <div className="menu">
          { buttonSession }
          { /* <img src={iconMenu} className="icon-menu" alt="Menu" /> */}
        </div>
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