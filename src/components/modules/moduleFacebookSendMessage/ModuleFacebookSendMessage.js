import React, { Component } from 'react';
import './ModuleFacebookSendMessage.css';

class ModuleFacebookSendMessage extends Component {
  render() {
    return (
      <div className="mod-facebook-send mod-row">
        <textarea className="mod-inp" readOnly value="#myhashtag"/>
      </div>
    );
  }
}

export default ModuleFacebookSendMessage;