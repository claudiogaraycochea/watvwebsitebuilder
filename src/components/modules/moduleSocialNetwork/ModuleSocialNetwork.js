import React, { Component } from 'react';
import './ModuleSocialNetwork.css';

class ModuleSocialNetwork extends Component {
  render() {
    return (
      <div>
        Follow US
        <a href="https://nba.com" className="btn" >Facebook</a>
        <a href="https://nba.com" className="btn" >Twitter</a>
      </div>
    );
  }
}

export default ModuleSocialNetwork;