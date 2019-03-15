import React, { Component } from 'react';
import './CreateWebsite.css';
import axios from 'axios';
import { API_URL } from '../../constants';

const createWebsiteList = [
  {
    title: 'Buy Now',
    description: 'Use Buy Now to sell products from your advertisers.',
    image: 'url',
    template: 'buy_now',
    runSrc: '{"components":[{"moduleKey":"ModuleImage","moduleTitle":"Image","moduleSrc":{"imageURL":"","imageSize":"small"}},{"moduleKey":"ModuleTitleDescription","moduleTitle":"Title Description","moduleSrc":{"title":"Title0","description":"Description"}},{"moduleKey":"ModuleBuyNow","moduleTitle":"Buy Now","moduleSrc":{"title":"Testing","buttonLink":"http://","buttonTitle":"Buy Now"}},{"moduleKey":"ModuleRealtimeReactions","moduleTitle":"Realtime Reactions","moduleSrc":{"title":"Realtime Reactions","reactions":"happy, sad, like, love"}}],"template":{"title":"MyTemplate 1","styles":{"background":{"backgroundColor":"#0099cc","fontSize":20,"fontFamily":"Bitter"},"title":{"fontSize":50},"subtitle":{"fontSize":20},"button":{"backgroundColor":"#ff0022","fontColor":"#ffffff"}}}}',
  },
  {
    title: 'Download App',
    description: 'Use Vote for your viewers to vote for a movie, get a general opinion or vote for the best player.',
    image: 'url',
    template: 'download_app',
    runSrc: '{"components":[{"moduleKey":"ModuleTitleDescription","moduleTitle":"Title Description","moduleSrc":{"title":"Download APP","description":"Description"}},{"moduleKey":"ModuleDownloadApp","moduleTitle":"Download App","moduleSrc":{"buttonLink":"http://","buttonTitle":"Google Play"}}],"template":{"title":"MyTemplate 1","styles":{"background":{"backgroundColor":"#ff0000","fontSize":20,"fontFamily":"Bitter"},"title":{"fontSize":50},"subtitle":{"fontSize":20},"button":{"backgroundColor":"#ff0022","fontColor":"#ffffff"}}}}',
  },
]

class CreateWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      name: '',
    };
  }

  handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  }

  getTemplateToRunSrc = (template) => {
    const item = createWebsiteList.filter(item => item.template === template );
    return item[0].runSrc; 
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
    const name = this.state.name;
    if(name.length>2){
      const template = e.target.value;
      const userId = sessionStorage.getItem('userId');
      const userToken = sessionStorage.getItem('userToken');
      const paramsData = `user_id=${userId}&user_token=${userToken}&website_name=${name}&website_template=${template}`;
      axios.post(`${API_URL}sw`, paramsData )
        .then(response => {
          if(response.data.result) {
            this.saveRunSrc(response.data.website_id, template);
          }
        })
        .catch(error => {});
    }
    else {
      this.setState({
        message: 'Complete Website Name',
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {(this.state.message!==undefined) ? <div>{this.state.message}</div> : null }
        <input type="text" name="name" className="inp" placeholder="Website Name (eg: Advertise for company)" onChange={this.handleInputChange}/>
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

export default CreateWebsite;