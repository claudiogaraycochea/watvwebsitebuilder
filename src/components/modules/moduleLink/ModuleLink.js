import React, { Component } from 'react';
import './ModuleLink.css';

class ModuleLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleSrc: null,
    };
    
  }
  
  componentDidMount() {
    this.setState({
      properties: this.props.properties
    })
  }

  createModuleSrc(props, e, moduleSrcInput){
    // set values;
    let moduleSrc = {
      title: props.moduleSrc.title,
      buttonLink: props.moduleSrc.buttonLink,
      buttonTitle: props.moduleSrc.buttonTitle
    };

    if(moduleSrcInput==='title') moduleSrc.title = e.target.value;
    if(moduleSrcInput==='buttonTitle') moduleSrc.buttonTitle = e.target.value;
    if(moduleSrcInput==='buttonLink') moduleSrc.buttonLink = e.target.value;
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
            <input type="text" className="inp" placeholder="Button Title" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'buttonTitle')}} />
          </div>
          <div className="">
            <input type="text" className="inp" placeholder="https://example.com" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'buttonLink')}} />
          </div>
        </div>
      )
    }
    else {
      //console.log('ModuleLink',this.props.moduleSrc);
      return (
        <div className="module-link website-row">
          <div>{(this.props.moduleSrc.title!=='') ? this.props.moduleSrc.title : 'Write a title' }</div>
          <div>
            <a href={this.props.moduleSrc.buttonLink} className="btn">
              {(this.props.moduleSrc.buttonTitle!=='') ? this.props.moduleSrc.buttonTitle : 'Visit Link' }
            </a>
          </div>
        </div>
      );
    }
  }
}

export default ModuleLink;