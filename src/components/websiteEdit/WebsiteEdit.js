import React, { Component } from 'react';
import './WebsiteEdit.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';

class WebsiteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstname: '',
      websiteList: [],
      websiteId: '',
      websiteData: {},
      websiteTemplate: [
        {
          modulePosition: 0,
          moduleKey: 'module_link',
          moduleTitle: 'Simple Link',
          moduleSrc: {
            title: 'Visit us',
            description: 'List of channels',
            link: 'http://booking.com',
          }
        },
        {
          modulePosition: 1,
          moduleKey: 'module_social',
          moduleTitle: 'Social Network',
          moduleSrc: {
            title: 'Follow us',
            link_facebook: '',
            link_twitter: '',
          }
        },
      ]
    };
    //this.handleSearchKeyUp = this.keyUpHandler.bind(this, 'inputSearch');
  }

  componentWillMount() {
    const websiteId = this.props.match.params.websiteId;
    this.setState({
      websiteId
    });
  }
  
  componentDidMount() {
    const websiteId = this.state.websiteId;
    axios.get(`${API_URL}getRun/?website_id=${websiteId}`)
      .then(response => {
        this.setState({
          websiteData: response.data
        })
      })
      .catch(error => {});
  }

  render() {
    console.log('>>>>>>this.state: ',this.state);
    return (
      <div className="tertiary-style">
        <div className="container padding-20">
          <div className="container-header">
            <div className="left">
              <h2>Website Editor</h2>
            </div>
            <div className="right">
              <Link to={`/pro/${this.state.websiteId}`} className="btn btn-secondary">View</Link> 
            </div>
          </div>
          <div class="editor-wrapper">
            <div className="module-wrapper">
              <div className="modules-list">
                {
                  this.state.websiteTemplate.map((item,i) => 
                    <div className="module-box" key={i}>
                      {/*item.moduleKey*/} 
                      {item.moduleTitle}
                    </div>  
                  )
                }
              </div>             
            </div>
            <div className="drag-wrapper">
              Drag
            </div>
            <div className="properties-wrapper">
              Properties
            </div>
          </div>

        </div>
        <Footer className="footer"/>    
      </div>
    );
  }
}

export default WebsiteEdit;