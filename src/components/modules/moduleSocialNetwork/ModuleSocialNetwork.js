import React, { Component } from 'react';
import './ModuleSocialNetwork.css';

class ModuleSocialNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleSrc: null,
    };
    //this.handleMenuBtn = this.handleMenuBtn.bind(this);
  }

  componentDidMount() {
    this.setState({
      properties: this.props.properties
    })
  }

  render() {
    if(this.state.properties===true) {
      return (
        <div>
          <div>Module Social Network Properties:</div> 
          <div>
            <input type="text" onChange={()=>{}} />
          </div>
          <div>
            <a href="https://nba.com" className="btn" >Save</a>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="social-network-wrapper">
          <div className="buttons-wrapper">
            <a href="https://nba.com" className="btn btn-circle" ><i className="icon-facebook"></i></a>
            <a href="https://nba.com" className="btn btn-circle" ><i className="icon-facebook"></i></a>
          </div>
        </div>
      );
    }
  }
}

export default ModuleSocialNetwork;