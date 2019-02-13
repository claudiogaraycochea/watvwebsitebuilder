import React, { Component } from 'react';
import logo from '../../assets/logo-watv.svg';
import iconMenu from '../../assets/icon-menu.svg';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstname: '',
      websiteLinkname: '',
      searchList: []
    };
    //this.handleSearchKeyUp = this.keyUpHandler.bind(this, 'inputSearch');
  }

  componentWillMount(props) {
    const userFirstname = sessionStorage.getItem('userFirstname');
    if(userFirstname!==null){
      this.setState({
        userFirstname
      })
    }
    else {
      console.log('Resetea');
    }
  }

  render() {
    return (
      <div className="header">
        <a href="/"><img src={logo} className="logo" alt="" /></a>
        <div className="search">
          Website Builder
        </div>
        <div className="menu">
          { (this.state.userFirstname!=='') ? <div>Hi {this.state.userFirstname}!</div> : null }
          <img src={iconMenu} className="icon-menu" alt="Menu" /> 
        </div>
      </div>
    );
  }
}

export default Header;