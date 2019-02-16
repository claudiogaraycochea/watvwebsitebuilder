import React, { Component } from 'react';
import './ModuleLink.css';

class ModuleLink extends Component {
  render() {
    return (
      <div>
        Haz click en el siguiente enlace
        <a href="https://nba.com" className="btn" >Send</a>
      </div>
    );
  }
}

export default ModuleLink;