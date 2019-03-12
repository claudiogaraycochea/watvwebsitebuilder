import React, { Component } from 'react';
import './ModuleFacebookSendMessage.css';

class ModuleFacebookSendMessage extends Component {
  render() {
    return (
      <div className="module-facebook-send website-row">
        <textarea className="inp" readOnly value="#myhashtag"/>
      </div>
    );
  }
}

export default ModuleFacebookSendMessage;