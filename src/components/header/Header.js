import React, { Component } from 'react';
import logo from '../../assets/logo-watv.svg';
//import iconMenu from '../../assets/icon-menu.svg';
import './Header.css';
import { withRouter} from 'react-router-dom';
/*window.addEventListener('storage', function(e) {  
  
  if(e.storageArea===sessionStorage) {
    console.log('Session storage change');   
  }

});*/
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleCloseSession = () => {
    console.log('Close session');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userFirstname');
    sessionStorage.removeItem('userToken');
    this.props.history.push('/login');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('Header: getDerivedStateFromProps:');
    return null;
  }

  render() {
    const userFirstname = (sessionStorage.getItem('userFirstname')!==null) ? <div>Hi {sessionStorage.getItem('userFirstname')}! <button className="btn small" onClick={()=>this.handleCloseSession()}>Log Out</button></div> : null;
    
    return (
      <div className="header">
        <a href="/websiteList"><img src={logo} className="logo" alt="" /></a>
        <div className="search">
          Website Builder
        </div>
        <div className="menu">
          { userFirstname }
          { /* <img src={iconMenu} className="icon-menu" alt="Menu" /> */}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);