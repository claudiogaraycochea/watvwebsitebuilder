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
      properties: this.props.properties,
      moduleSrc: this.props.moduleSrc,
    })
  }

  createModuleSrc(props, e, moduleSrcInput){
    // set values;
    let moduleSrc = {
      imageURL: props.moduleSrc.imageURL,
      imageSize: props.moduleSrc.imageSize,
    };
    if(moduleSrcInput==='imageURL') moduleSrc.imageURL = e.target.value;
    if(moduleSrcInput==='imageSize') moduleSrc.imageSize = e.target.value;
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
            <input type="text" defaultValue={this.state.moduleSrc.imageURL} className="inp" placeholder="imageURL" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'imageURL')}} />
          </div>
          <div className="row">
            <select className="inp" onChange={(e)=>{this.createModuleSrc(this.props,e,'imageSize')}} > 
              <option value="size-20">20</option>
              <option value="size-40" selected>40</option>
              <option value="size-60">60</option>
              <option value="size-80">80</option>
              <option value="size-100">100</option>
            </select>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="mod-image">
          {(this.props.moduleSrc.imageURL!=='') ? <img src={this.props.moduleSrc.imageURL} className={this.props.moduleSrc.imageSize} alt=""/> : <i className={`no-image ${this.props.moduleSrc.imageSize}`}></i> }
        </div>
      );
    }
  }
}

export default ModuleImage;