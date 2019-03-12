import React, { Component } from 'react';
import './ModuleImage.css';

class ModuleImage extends Component {
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
      imageURL: props.moduleSrc.imageURL,
      imageSize: props.moduleSrc.imageSize,
    };

    console.log('*******',moduleSrc);
    if(moduleSrcInput==='imageURL') moduleSrc.imageURL = e.target.value;
    if(moduleSrcInput==='imageSize') moduleSrc.imageSize = e.target.value;
    props.setModuleProperties(moduleSrc);
  }

  render() {
    if(this.state.properties===true) {
      return (
        <div>
          <div className="row">
            <input type="text" className="inp" placeholder="imageURL" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'imageURL')}} />
          </div>
          <div className="row">
            <select className="inp" onChange={(e)=>{this.createModuleSrc(this.props,e,'imageSize')}} > 
              <option value="ultra-small">Ultra Small</option>
              <option value="small" selected>Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            {/*<input type="text" className="inp" placeholder="imageSize" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'imageSize')}} />*/}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="mod-image mod-row">
          {(this.props.moduleSrc.imageURL!=='') ? <img src={this.props.moduleSrc.imageURL} className={this.props.moduleSrc.imageSize} alt=""/> : <i className="no-image"></i> }
        </div>
      );
    }
  }
}

export default ModuleImage;