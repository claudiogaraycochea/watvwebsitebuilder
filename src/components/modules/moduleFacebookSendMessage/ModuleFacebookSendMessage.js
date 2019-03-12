import React, { Component } from 'react';
import './ModuleFacebookSendMessage.css';

class ModuleFacebookSendMessage extends Component {
  render() {
    return (
      <div className="module-facebook-send">
        <div className="row">
          <textarea className="inp" readOnly value="#myhashtag"></textarea>
        </div>
      </div>
    );
  }
}

export default ModuleFacebookSendMessage;