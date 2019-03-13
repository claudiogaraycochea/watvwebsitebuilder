import React, { Component } from 'react';
import './ModuleDownloadApp.css';

class ModuleDownloadApp extends Component {
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
      buttonLinkGooglePlay: props.moduleSrc.buttonLinkGooglePlay,
      buttonLinkAppStore: props.moduleSrc.buttonLinkAppStore
    };
    if(moduleSrcInput==='buttonLinkGooglePlay') moduleSrc.buttonLinkGooglePlay = e.target.value;
    if(moduleSrcInput==='buttonLinkAppStore') moduleSrc.buttonLinkAppStore = e.target.value;
    props.setModuleProperties(moduleSrc);
  }

  render() {
    if(this.state.properties===true) {
      return (
        <div>
          <div className="row">
            <input type="text" className="inp" placeholder="URL Google Play" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'buttonLinkGooglePlay')}} />
          </div>
          <div className="">
            <input type="text" className="inp" placeholder="URL App Store" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'buttonLinkAppStore')}} />
          </div>
        </div>
      )
    }
    else {
      //console.log('ModuleLink',this.props.moduleSrc);
      return (
        <div className="mod-download-app mod-row">
          <div className="mod-row-small">
            <a href={this.props.moduleSrc.buttonLinkGooglePlay} className="mod-btn mod-large-full mod-btn-no-space">
              <i className="mod-btn-google-play"/>
            </a>
          </div>
          <div className="mod-row-small">
            <a href={this.props.moduleSrc.buttonLinkAppStore} className="mod-btn mod-large-full mod-btn-no-space">
            <i className="mod-btn-app-store"/>
            </a>
          </div>
        </div>
      );
    }
  }
}

export default ModuleDownloadApp;