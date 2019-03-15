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
    runSrc: '{"components":[{"moduleKey":"ModuleImage","moduleTitle":"Image","moduleSrc":{"imageURL":"","imageSize":"small"}},{"moduleKey":"ModuleTitleDescription","moduleTitle":"Title Description","moduleSrc":{"title":"Title","description":"Description"}},{"moduleKey":"ModuleBuyNow","moduleTitle":"Buy Now","moduleSrc":{"title":"Testing","buttonLink":"http://","buttonTitle":"Buy Now"}},{"moduleKey":"ModuleRealtimeReactions","moduleTitle":"Realtime Reactions","moduleSrc":{"title":"Realtime Reactions","reactions":"happy, sad, like, love"}}],"template":{"title":"MyTemplate 1","styles":{"background":{"backgroundColor":"#0099cc","fontSize":20,"fontFamily":"Bitter"},"title":{"fontSize":50},"subtitle":{"fontSize":20},"button":{"backgroundColor":"#ff0022","fontColor":"#ffffff"}}}}',
  },
  {
    title: 'Vote',
    description: 'Use Vote for your viewers to vote for a movie, get a general opinion or vote for the best player.',
    image: 'url',
    template: 'vote',
    runSrc: '{"components":[{"moduleKey":"ModuleImage","moduleTitle":"Image","moduleSrc":{"imageURL":"","imageSize":"small"}},{"moduleKey":"ModuleTitleDescription","moduleTitle":"Title Description","moduleSrc":{"title":"Title","description":"Description"}},{"moduleKey":"ModuleBuyNow","moduleTitle":"Buy Now","moduleSrc":{"title":"Testing","buttonLink":"http://","buttonTitle":"Buy Now"}},{"moduleKey":"ModuleRealtimeReactions","moduleTitle":"Realtime Reactions","moduleSrc":{"title":"Realtime Reactions","reactions":"happy, sad, like, love"}}],"template":{"title":"MyTemplate 1","styles":{"background":{"backgroundColor":"#0099cc","fontSize":20,"fontFamily":"Bitter"},"title":{"fontSize":50},"subtitle":{"fontSize":20},"button":{"backgroundColor":"#ff0022","fontColor":"#ffffff"}}}}',
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

  getTemplateToRunSrc = (template) => {
    console.log('getTemplateToRunSrc: ',template);
    return '{"components":[{"moduleKey":"ModuleImage","moduleTitle":"Image","moduleSrc":{"imageURL":"","imageSize":"small"}},{"moduleKey":"ModuleTitleDescription","moduleTitle":"Title Description","moduleSrc":{"title":"Title","description":"Description"}},{"moduleKey":"ModuleBuyNow","moduleTitle":"Buy Now","moduleSrc":{"title":"Testing","buttonLink":"http://","buttonTitle":"Buy Now"}},{"moduleKey":"ModuleRealtimeReactions","moduleTitle":"Realtime Reactions","moduleSrc":{"title":"Realtime Reactions","reactions":"happy, sad, like, love"}}],"template":{"title":"MyTemplate 1","styles":{"background":{"backgroundColor":"#0099cc","fontSize":20,"fontFamily":"Bitter"},"title":{"fontSize":50},"subtitle":{"fontSize":20},"button":{"backgroundColor":"#ff0022","fontColor":"#ffffff"}}}}';
  }

  saveRunSrc = (websiteId, template) => {
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');
    const runSrc = this.getTemplateToRunSrc(template);
    let postData='data='+runSrc+'&website_id='+websiteId+'&user_id='+userId+'&user_token='+userToken;
    console.log('Save changes',postData);
    axios.post(`${API_URL}setRun/`,postData)
      .then(response => {
        if(response.data.result==='true') {
          this.props.loadList({websiteIdCreated: websiteId});
          this.props.closeModal();
        }
      })
      .catch(error => {});
  }

  handleClickCreateWebsite = (e) => {
    const name = 'Testing 1';
    const template = e.target.value;
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');
    console.log('createWebsite', template);
    const paramsData = `user_id=${userId}&user_token=${userToken}&website_name=${name}&website_template=${template}`;
    axios.post(`${API_URL}sw`, paramsData )
      .then(response => {
        if(response.data.result) {
          this.saveRunSrc(response.data.website_id, template);
        }
      })
      .catch(error => {});
  }

  render() {
    return (
      <div>
        <input type="text" className="inp" placeholder="Website Name (eg: Advertise for company)" />
        <p>
          Choose a theme refered to your target.
        </p>
        <div>
          {createWebsiteList.map((item, key)=>
            <div key={key}>
              Option {item.title}
              <button value={item.template} onClick={(e) => this.handleClickCreateWebsite(e)}>Select</button>
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