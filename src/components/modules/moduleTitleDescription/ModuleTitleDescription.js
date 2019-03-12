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
      let styles = {};
      if((Object.keys(this.props.runSrc).length === 0)||(this.props.showStyle===false)) {
        styles = {
          title: {
            fontSize: 30,
          }
        }
      }
      else {
        styles = this.props.runSrc.template.styles;
      }
      return (
        <div className="mod-title-description mod-row">
          {(this.props.moduleSrc.title!=='') ? <div className="mod-title" style={styles.title}>{this.props.moduleSrc.title}</div> : <div className="mod-title">Write a title</div> }
          {(this.props.moduleSrc.description!=='') ? <div>{this.props.moduleSrc.description}</div> : <div className="mod-description">Write a description</div> }
        </div>
      );
    }

  }
}

export default ModuleTitleDescription;