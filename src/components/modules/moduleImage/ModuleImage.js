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
    };

    if(moduleSrcInput==='imageURL') moduleSrc.imageURL = e.target.value;
    props.setModuleProperties(moduleSrc);
  }

  render() {
    if(this.state.properties===true) {
      return (
        <div>
          <div className="row">
            <input type="text" className="inp" placeholder="imageURL" onKeyUp={(e)=>{this.createModuleSrc(this.props,e,'imageURL')}} />
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="module-image">
          {(this.props.moduleSrc.imageURL!=='') ? <img src={this.props.moduleSrc.imageURL} className="large" alt=""/> : 'No Image' }
        </div>
      );
    }
  }
}

export default ModuleImage;