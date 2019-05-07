import React, { Component } from 'react';
import './ModuleSocialNetwork.css';

class ModuleSocialNetwork extends Component {
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
      urlFacebook: props.moduleSrc.urlFacebook,
      urlInstagram: props.moduleSrc.urlInstagram,
      urlTwitter: props.moduleSrc.urlTwitter,
    };
    if(moduleSrcInput==='urlFacebook') moduleSrc.urlFacebook = e.target.value;
    if(moduleSrcInput==='urlInstagram') moduleSrc.urlInstagram = e.target.value;
    if(moduleSrcInput==='urlTwitter') moduleSrc.urlTwitter = e.target.value;
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
            <input type="text" defaultValue={this.state.moduleSrc.urlFacebook} className="inp" placeholder="URL Facebook" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'urlFacebook')}} />
          </div>
          <div className="row">
            <input type="text" defaultValue={this.state.moduleSrc.urlInstagram} className="inp" placeholder="URL Instagram" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'urlInstagram')}} />
          </div>
          <div>
            <input type="text" defaultValue={this.state.moduleSrc.urlTwitter} className="inp" placeholder="URL Twitter" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'urlTwitter')}} />
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
        <div className="mod-social-network mod-row">
          <div className="mod-buttons-wrapper">
            {(this.props.moduleSrc.urlFacebook!=='') ? <a href={this.props.moduleSrc.urlFacebook} className="mod-btn mod-btn-circle" style={styles.button}><i className="mod-icon-facebook"></i></a> : null }
            {(this.props.moduleSrc.urlInstagram!=='') ? <a href={this.props.moduleSrc.urlInstagram} className="mod-btn mod-btn-circle" style={styles.button}><i className="mod-icon-instagram"></i></a> : null }
            {(this.props.moduleSrc.urlTwitter!=='') ? <a href={this.props.moduleSrc.urlTwitter} className="mod-btn mod-btn-circle" style={styles.button}><i className="mod-icon-twitter"></i></a> : null }
          </div>
        </div>
      );
    }
  }
}

export default ModuleSocialNetwork;