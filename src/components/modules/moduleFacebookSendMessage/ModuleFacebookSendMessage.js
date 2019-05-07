import React, { Component } from 'react';
import './ModuleFacebookSendMessage.css';

class ModuleFacebookSendMessage extends Component {
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
      text: props.moduleSrc.text,
      buttonTitle: props.moduleSrc.buttonTitle
    };
    if(moduleSrcInput==='buttonTitle') moduleSrc.buttonTitle = e.target.value;
    if(moduleSrcInput==='text') moduleSrc.text = e.target.value;
    props.setModuleProperties(moduleSrc);
    this.setState({
      moduleSrc,
    })
  }

  render() {
    if(this.state.properties===true) {
      return (
        <div>          
          <div className="row">
            <textarea defaultValue={this.state.moduleSrc.text} className="inp" placeholder="Text" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'text')}} />
          </div>
          <div>
            <input type="text" defaultValue={this.state.moduleSrc.buttonTitle} className="inp" placeholder="Button Title" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'buttonTitle')}} />
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
        <div className="mod-facebook-send-message mod-row">
          <div className="mod-row-small">
            <textarea className="mod-inp" readOnly value={this.props.moduleSrc.text}/>
          </div>
          <div className="mod-row-small">
            <a href={this.props.moduleSrc.text} className="mod-btn mod-large-full mod-btn-no-space" style={styles.button}>
              {(this.props.moduleSrc.buttonTitle!=='') ? this.props.moduleSrc.buttonTitle : 'Send' }
            </a>
          </div>
        </div>
      );
    }
  }
}

export default ModuleFacebookSendMessage;