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
      properties: this.props.properties,
      moduleSrc: this.props.moduleSrc,
    })
  }

  createModuleSrc(props, e, moduleSrcInput){
    let moduleSrc = {
      buttonLink: props.moduleSrc.buttonLink,
      buttonTitle: props.moduleSrc.buttonTitle
    };
    if(moduleSrcInput==='buttonTitle') moduleSrc.buttonTitle = e.target.value;
    if(moduleSrcInput==='buttonLink') moduleSrc.buttonLink = e.target.value;
    props.setModuleProperties(moduleSrc);
    this.setState({
      moduleSrc,
    });
  }

  render() {
    if(this.state.properties===true) {
      return (
        <div>
          <div className="row">
            <input type="text" defaultValue={this.state.moduleSrc.buttonTitle} className="inp" placeholder="Button Title" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'buttonTitle')}} />
          </div>
          <div className="">
            <input type="text" defaultValue={this.state.moduleSrc.buttonLink} className="inp" placeholder="https://example.com" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'buttonLink')}} />
          </div>
        </div>
      )
    }
    else {
      let styles = {};
      if((Object.keys(this.props.runSrc).length === 0)||(this.props.showStyle===false)) {
        styles = {
          button: {
          }
        }
      }
      else {
        styles = this.props.runSrc.template.styles;
      }
      if(this.props.styles) {
        styles = this.props.styles;
      }
      return (
        <div className="mod-link mod-row">
          <a href={this.props.moduleSrc.buttonLink} className="mod-btn mod-large-full mod-btn-no-space" style={styles.button}>
            {(this.props.moduleSrc.buttonTitle!=='') ? this.props.moduleSrc.buttonTitle : 'Visit Link' }
          </a>
        </div>
      );
    }
  }
}

export default ModuleLink;