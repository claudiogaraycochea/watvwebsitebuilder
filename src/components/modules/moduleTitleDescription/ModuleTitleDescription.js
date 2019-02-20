import React, { Component } from 'react';
import './ModuleTitleDescription.css';

class ModuleTitleDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleSrc: null,
    };
    
  }
  
  componentDidMount() {
    console.log('**************** componentDidMount: ModuleLink:', this.props.properties);
    this.setState({
      properties: this.props.properties
    })
  }

  createModuleSrc(props, e, moduleSrcInput){
    // set values;
    let moduleSrc = {
      title: props.moduleSrc.title,
      description: props.moduleSrc.description,
    };

    if(moduleSrcInput==='title') moduleSrc.title = e.target.value;
    if(moduleSrcInput==='description') moduleSrc.description = e.target.value;
    props.setModuleProperties(moduleSrc);
  }

  render() {
    if(this.state.properties===true) {
      return (
        <div>
          <div className="row">
            <input type="text" className="inp" placeholder="Title" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'title')}} />
          </div>
          <div className="row">
            <input type="text" className="inp" placeholder="Description" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'description')}} />
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          {(this.props.moduleSrc.title!=='') ? <div>{this.props.moduleSrc.title}</div> : 'Write a title' }
          {(this.props.moduleSrc.description!=='') ? <div>{this.props.moduleSrc.description}</div> : 'Write a description' }
        </div>
      );
    }
  }
}

export default ModuleTitleDescription;