import React, { Component } from 'react';
import './WebsiteRun.css';
import Footer from '../footer/Footer';
import axios from 'axios';
import { API_URL } from '../../constants';

class WebsiteRun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstname: '',
      websiteList: [],
      websiteData: {
        title: '',
        run_src: {}
      }
    };
    //this.handleSearchKeyUp = this.keyUpHandler.bind(this, 'inputSearch');
  }

  componentWillMount() {
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');
    axios.get(`${API_URL}gwl/?user_id=${userId}&user_token=${userToken}`)
      .then(response => {
        this.setState({
          websiteList: response.data
        })
        //this.props.history.push("/WebsiteList");
      })
      .catch(error => {});
  }
  
  render() {
    return (
      <div className="tertiary-style">
        <div className="container padding-20">
          Production
        </div>
        <Footer className="footer"/>    
      </div>
    );
  }
}

export default WebsiteRun;