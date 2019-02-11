import React, { Component } from 'react';
import logo from '../../assets/logo-watv.svg';
import iconMenu from '../../assets/icon-menu.svg';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteLinkname: '',
      searchList: []
    };
    //this.handleSearchKeyUp = this.keyUpHandler.bind(this, 'inputSearch');
  }

  render() {
    return (
      <div className="header">
        <a href="/"><img src={logo} className="logo" alt="" /></a>
        <div className="search">
          Website Editor
        </div>
        <div className="menu">
          <img src={iconMenu} className="icon-menu" alt="Menu" /> 
        </div>
      </div>
    );
  }
}

export default Header;