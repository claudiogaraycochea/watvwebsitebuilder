import React, { Component } from 'react';
import './ModuleImage.css';
import axios from "axios";

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

  fileUpload = (functionCallBack, event) => {
    const selectedFile = event.target.files[0];
    const userId = sessionStorage.getItem("userId");
    if (selectedFile !== null) {
      if (userId !== null) {
        const fd = new FormData();

        fd.append("image", selectedFile, selectedFile.name);
        fd.append("user", userId);
        const paramsData = fd;

        axios.post("https://modules.weband.tv/upload/upload.php", paramsData)
          .then(res => {
            console.log("fileUpload: res: ", res);
            if (res.data.filename_server) {
              console.log(
                "functionCallBack",
                functionCallBack,
                "url",
                res.data.filename_server
              );
              switch (functionCallBack) {
                case "setImageURL":
                  this.setImageURL(res.data.filename_server);
                  break;
                default:
                  return null;
              }
            }
          })
          .catch(error => { });
      } else {
        console.log("Please login session");
      }
    } else {
      console.log("have not image");
    }
  };

  setImageURL(filename_server){
    const e = {
      target: {
        value: filename_server,
      }
    };
    this.createModuleSrc(this.props, e, "imageURL");
  }

  render() {
    //console.log(this.state);
    if(this.state.properties===true) {
      return (
        <div>
          <div className="row">
            <input
              type="file"
              onChange={e => this.fileUpload("setImageURL", e)}
            />
          </div>
          <div className="row">
            <select
              className="inp"
              onChange={e => {
                this.createModuleSrc(this.props, e, "imageSize");
              }}
            >
              <option value="size-20">20</option>
              <option value="size-40" selected>
                40
              </option>
              <option value="size-60">60</option>
              <option value="size-80">80</option>
              <option value="size-100">100</option>
            </select>
          </div>
        </div>
      );
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