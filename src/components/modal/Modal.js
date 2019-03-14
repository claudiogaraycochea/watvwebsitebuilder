import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {

  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-box">
          <div className="modal-header">{this.props.title} <button onClick={this.props.closeModal} className="btn small">Close</button></div>  
          <div className="modal-content">{this.props.children}</div>
          <div className="modal-footer"><button onClick={this.props.closeModal} className="btn btn-primary">Ok</button></div>
        </div>
      </div>
    );
  }
}

export default Modal;