import React, { Component } from 'react';
import './ModuleFacebookSendMessage.css';

class ModuleFacebookSendMessage extends Component {
  render() {
    return (
      <div>
        <div>
          Send Message:
        </div>
        <div>
          <textarea readOnly value="#myhashtag"></textarea>
        </div>
        <div>
          <a href="https://nba.com" className="btn">Send</a>
        </div>
      </div>
    );
  }
}

export default ModuleFacebookSendMessage;