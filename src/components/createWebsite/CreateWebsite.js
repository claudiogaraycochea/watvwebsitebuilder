import React, { Component } from 'react';
import './CreateWebsite.css';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../constants';
/*
api: /sw
methos: post

website_name: Testing 1
website_template: buynow
user_id: 2
user_token: c9e8b6c961456291f62c27fbbc1392667196ae97*/

const createWebsiteList = [
  {
    title: 'Buy Now',
    description: 'Use Buy Now to sell products from your advertisers.',
    image: 'url',
    template: 'buy_now',
    runSrc: {
      text: 'nothing',
    }
  },
  {
    title: 'Vote',
    description: 'Use Vote for your viewers to vote for a movie, get a general opinion or vote for the best player.',
    image: 'url',
    template: 'vote',
    runSrc: {
      text: 'nothing',
    }
  },
]

class CreateWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      website: {
        name: '',

      }
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      userFirstname: sessionStorage.getItem('userFirstname'),
    };
  }

  handleClickCreateWebsite = (e) => {
    const name = 'Testing 1';
    const template = e.target.value;
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');
    console.log('createWebsite', e.target.value);
    const paramsData = `user_id=${userId}&user_token=${userToken}&website_name=${name}&website_template=${template}`;
    axios.post(`${API_URL}sw`, paramsData )
      .then(response => {
        if(response.data.result) {
          this.props.loadList({websiteIdCreated: response.data.website_id});
          this.props.closeModal();
        }
      })
      .catch(error => {});
  }

  render() {
    return (
      <div>
        <input type="text" className="inp" placeholder="Website Name (eg: Advertise for company)"/>
        <p>
          Choose a theme refered to your target.
        </p>
        <div>
          {createWebsiteList.map((item, key)=>
            <div key={key}>
              Option {item.title}
              <button template={item.template} onClick={(e) => this.handleClickCreateWebsite(e)}>Select</button>
            </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userFirstname: state.userFirstname,
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateWebsite));