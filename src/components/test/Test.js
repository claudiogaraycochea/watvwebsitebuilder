import React, { Component } from 'react';
import axios from 'axios';
// import { API_URL } from '../../constants';
import { connect } from 'react-redux';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile : null,
      loading: false,
    };
  }
  
  fileSelect = event => {
    this.setState({selectedFile: event.target.files[0]})
    console.log(event.target.files[0]);
  }

  fileUpload = () => {
    const userId = sessionStorage.getItem('userId');
    console.log('fileUpload: selectedFile',this.state.selectedFile);
    if(this.state.selectedFile!==null) {
      console.log('fileUpload: userId: ', userId);
      if(userId!==null) {
        const fd = new FormData();
        
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        fd.append('user', userId);
        const paramsData = fd;
       
        axios.post('https://modules.weband.tv/upload/upload.php', paramsData).then(res => {
          console.log(res);
        })
        .catch(error => {});
      }
      else {
        console.log('Please login session');
      }
    }
    else {
      console.log('have not image');
    }

  }

  render() {
    return (
      <div>
        <input type="file" onChange = {this.fileSelect} />
        <button onClick = {(e)=>this.fileUpload()}>Upload</button>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);