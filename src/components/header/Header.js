import React, { Component } from 'react';
import logo from '../../assets/logo-watv.svg';
//import iconMenu from '../../assets/icon-menu.svg';
import './Header.css';
import { withRouter} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstname: '',
      websiteLinkname: '',
      searchList: [],
      menuVisible: false,
      redirect: false,
    };
    
  }

  componentDidUpdate(props) {
    const userFirstname = sessionStorage.getItem('userFirstname');
    console.log('Header: componentWillMount', userFirstname);
    if(userFirstname!==null){
      this.setState({
        userFirstname,
        menuVisible: true,
      })
    }
  }

  handleCloseSession = () => {
    console.log('Close session');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userFirstname');
    sessionStorage.removeItem('userToken');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="header">
        <a href="/websiteList"><img src={logo} className="logo" alt="" /></a>
        <div className="search">
          Website Builder
        </div>
        <div className="menu">
          { (this.state.menuVisible!==null) ? <div>Hi {this.state.userFirstname}! <button className="btn small" onClick={()=>this.handleCloseSession()}>Log Out</button></div> : null }
          { /* <img src={iconMenu} className="icon-menu" alt="Menu" /> */}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);