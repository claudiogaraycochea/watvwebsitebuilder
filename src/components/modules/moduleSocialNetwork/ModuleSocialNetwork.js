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
        <div>
          Follow US
          <a href="https://nba.com" className="btn" >Facebook</a>
          <a href="https://nba.com" className="btn" >Twitter</a>
        </div>
      );
    }
  }
}

export default ModuleSocialNetwork;