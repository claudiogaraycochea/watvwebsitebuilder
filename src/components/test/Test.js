import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
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
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    console.log('******************** >>>>>>>>>>>> ',fd);
    /*axios.post('https://modules.weband.tv/upload/upload_file.php', fd).then(res=>{
      console.log(res);
    });*/
    axios.post('https://modules.weband.tv/upload/upload_file.php', fd).then(res => {
      console.log(res);
    })
    .catch(error => {});
  }

  render() {
    return (
      <div>
        <input type="file" onChange = {this.fileSelect} />
        <button onClick = {this.fileUpload}>Upload</button>
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