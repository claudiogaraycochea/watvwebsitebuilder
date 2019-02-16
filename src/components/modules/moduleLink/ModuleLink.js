import React, { Component } from 'react';
import './ModuleLink.css';

class ModuleLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleSrc: null,
    };
    //this.handleMenuBtn = this.handleMenuBtn.bind(this);
  }
  
  componentDidMount() {
    console.log('**************** componentDidMount: ModuleLink:', this.props.properties);
    this.setState({
      properties: this.props.properties
    })
  }

  render() {
    if(this.state.properties===true) {
      return (
        <div>
          <div>Module Link Properties:</div> 
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
          Haz click en el siguiente enlace
          <a href="https://nba.com" className="btn" >Send</a>
        </div>
      );
    }
  }
}

export default ModuleLink;