import React, { Component } from 'react';
import './WebsiteList.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import * as commons from '../../commons/Commons';
import Modal from '../modal/Modal';
import CreateWebsite from '../createWebsite/CreateWebsite';

class WebsiteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteList: [],
      modalVisibility: false,
    };
    //this.clickHistory = this.clickHistory.bind(this);
  }

  componentWillMount() {
    this.loadList();
  }

  loadList = (data) => {
    const websiteIdCreated = (data!==undefined) ? data.websiteIdCreated : null;
    console.log('loadList: websiteIdCreated: ',websiteIdCreated);
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');
    axios.get(`${API_URL}gwl/?user_id=${userId}&user_token=${userToken}`)
      .then(response => {
        this.setState({
          websiteList: response.data,
          websiteIdCreated,
        })
      })
      .catch(error => {});
  }

  closeModal = () => {
    this.setState({modalVisibility: false});
  }

  handleClickEdit = () => {
    console.log('clickEdit')
    this.setState({modalVisibility: true});
  }

  render() {
    console.log(this.state);
    return (
      <div className="tertiary-style">
        <div className="container padding-lr">
          <div className="container-header">
            <div className="left">
              <h2>My Websites</h2>
            </div>
            <div className="right center-right">
              <Link to="/websiteList" className="btn btn-primary" onClick={()=>this.handleClickEdit()}><i className="icon-create-website space" /> Website</Link>
            </div>
          </div>
          <div className="table-list">
            <div className="item">
              <div className="col-6 col">Name</div>
              <div className="col-3 col">URL</div>
              <div className="col-6 col">Updated</div>
              <div className="col-6 col">Options</div>
            </div>  
            {this.state.websiteList.map((item,i) => {
              const styleItem = (parseInt(item.website_id) === this.state.websiteIdCreated) ? 'item selected' : 'item';
              return (<div className={styleItem} key={i}>
                { (parseInt(item.website_id) === this.state.websiteIdCreated) ? <div className="tooltip-wrapper"><div className="tooltip">Successfully created!</div></div> : null }
                <div className="col-6 col">{item.website_name}</div>
                <div className="col-3 col">https://modules.weband.tv/pro/{item.website_id}</div>
                <div className="col-6 col">{commons.dateFormat(item.website_updated)}</div>
                <div className="col-6 col">
                  <Link to={`/websiteEdit/${item.website_id}`} className="btn btn-secondary btn-circle"><i className="icon-edit"/></Link> 
                  <Link to={`/WebsiteDelete/${item.website_id}`} className="btn btn-circle"><i className="icon-trash"/></Link>
                </div>
              </div>)
            })}
          </div>
        </div>
        <Footer className="footer"/>
        { (this.state.modalVisibility) ? 
          <Modal 
            {...this.props}
            title='Create Website'
            closeModal={this.closeModal}
            >
            <CreateWebsite closeModal={this.closeModal} loadList={this.loadList} /> 
          </Modal> : null }  
      </div>
    );
  }
}

export default WebsiteList;