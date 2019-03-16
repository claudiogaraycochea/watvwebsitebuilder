import React, { Component } from 'react';
import './CreateWebsite.css';
import axios from 'axios';
import { API_URL } from '../../constants';
import * as commons from '../../commons/Commons';

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
  {
    title: 'Download App',
    description: 'Use Vote for your viewers to vote for a movie, get a general opinion or vote for the best player.',
    image: 'url',
    template: 'download_app',
    runSrc: '{"components":[{"moduleKey":"ModuleTitleDescription","moduleTitle":"Title Description","moduleSrc":{"title":"Download APP","description":"Description"}},{"moduleKey":"ModuleDownloadApp","moduleTitle":"Download App","moduleSrc":{"buttonLink":"http://","buttonTitle":"Google Play"}}],"template":{"title":"MyTemplate 1","styles":{"background":{"backgroundColor":"#ff0000","fontSize":20,"fontFamily":"Bitter"},"title":{"fontSize":50},"subtitle":{"fontSize":20},"button":{"backgroundColor":"#ff0022","fontColor":"#ffffff"}}}}',
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
      message: {
        text: '',
        typeMessage: 'alert',
      },
      name: '',
      screen: 'insert_name',
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

  handleClickChooseTemplate = () => {
    const name = this.state.name;
    console.log('click');
    if(name.length>2){
      this.setState({
        message: {
          text: '',
          typeMessage: 'alert',
        },
        screen: 'choose_template'
      })
    }
    else {
      this.setState({
        message: {
          text: 'Fill Website Name',
          typeMessage: 'alert',
        }
      });
    }
  }

  handleClickCreateWebsite = (e) => {
    const name = this.state.name;
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

  inputName = () => {
    return (<div>
      <div className="row">
        <input type="text" name="name" className="inp" placeholder="Website Name (eg: Advertise for company)" onChange={this.handleInputChange}/> 
      </div>
      <div className="">
        <button className="btn btn-primary" onClick={() => this.handleClickChooseTemplate()}>Next</button>
      </div>
    </div>);
  }

  chooseTemplate = () => {
    return (
      <div>
        {createWebsiteList.map((item, key)=>
          <div key={key} className="row">
            <div className="col-8" >
              <i className="template-download-app" />
            </div>
            <div className="col-4">
              <div className="row">
                <div className="title">{item.title}</div>
              </div>
              <div className="row">
                {item.description}
              </div>
              <div className="row">
                <button className="btn btn-primary" value={item.template} onClick={(e) => this.handleClickCreateWebsite(e)}>Select and Create</button>
              </div>
            </div>
          </div>
          )}
      </div>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className="create-website-wrapper">
        { commons.Notification(this.state.message.text, this.state.message.typeMessage) }
        {(this.state.screen==='insert_name') ? this.inputName() : this.chooseTemplate()}
      </div>
    );
  }
}

export default CreateWebsite;