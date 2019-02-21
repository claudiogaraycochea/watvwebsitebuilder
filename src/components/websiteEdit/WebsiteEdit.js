import React, { Component } from 'react';
import './WebsiteEdit.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import * as commons from '../../commons/Commons';

import ModuleLink from '../modules/moduleLink/ModuleLink';
import ModuleSocialNetwork from '../modules/moduleSocialNetwork/ModuleSocialNetwork';
import ModuleFacebookSendMessage from '../modules/moduleFacebookSendMessage/ModuleFacebookSendMessage';
import ModuleTitleDescription from '../modules/moduleTitleDescription/ModuleTitleDescription';
import ModuleImage from '../modules/moduleImage/ModuleImage';

class WebsiteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstname: '',
      websiteList: [],
      websiteId: '',
      websiteData: {},
      websiteDraggable: [
      /*  {
          moduleKey: 'ModuleLink',
          moduleTitle: 'Simple Link',
          moduleSrc: {
            title: 'Visit us',
            description: 'List of channels',
            link: 'http://booking.com',
          }
        },
        {
          moduleKey: 'ModuleFacebookSendMessage',
          moduleTitle: 'Facebook Send Message',
          moduleSrc: {
            title: 'Send Message',
            link_facebook: '',
            text: '#includeyourhashtag ',
          }
        }*/
      ],
      websiteDraggableConfig: {
        itemSelected: null,
      },
      modulesList: [
        {
          moduleKey: 'ModuleTitleDescription',
          moduleTitle: 'Title & Description',
          moduleSrc: {
            title: 'Title',
            description: 'Description',
          }
        },
        {
          moduleKey: 'ModuleImage',
          moduleTitle: 'Image',
          moduleSrc: {
            imageURL: 'https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/07/20/Recortada/img_ddusster_20180720-165008_imagenes_lv_getty_lalomanu-kaaH-U45974211241JiB-992x558@LaVanguardia-Web.jpg',
            size: 'small, medium, big',
          }
        },
        {
          moduleKey: 'ModuleLink',
          moduleTitle: 'Simple Link',
          moduleSrc: {
            title:'Testing',
            buttonLink: 'http://jjjjj.com',
            buttonTitle: ''
          }
        },
        {
          moduleKey: 'ModuleSocialNetwork',
          moduleTitle: 'Social Network',
          moduleSrc: {
            title: 'Follow us',
            link_facebook: '',
            link_twitter: '',
          }
        },
        {
          moduleKey: 'ModuleFacebookSendMessage',
          moduleTitle: 'Facebook Send Message',
          moduleSrc: {
            title: 'Send Message',
            link_facebook: '',
            text: '#includeyourhashtag ',
          }
        },
        {
          moduleKey: 'ModuleRealtimeReactions',
          moduleTitle: 'Realtime Reactions',
          moduleSrc: {
            title: 'Realtime Reactions',
            reactions: 'happy, sad, like, love',
          }
        },
      ],
      modalVisibility: false,
      websiteTemplates: [
        {
          title: 'MyTemplate 1',
          templateSrc: {
            backgroundImage: '',
            backgroundColor: 'red',
            fontSize: '20px',
            fontFamily: ''
          },
        },
        {
          title: 'MyTemplate 2',
          templateSrc: {
            backgroundImage: '',
            backgroundColor: 'blue',
            fontSize: '18px',
            fontFamily: ''
          },
        }
      ]
    };
    this.handleOnClickProperties = this.handleOnClickProperties.bind(this);
    this.handleCloseProperties = this.handleCloseProperties.bind(this);
    this.setModuleProperties = this.setModuleProperties.bind(this);
    this.handleOnClickRemove = this.handleOnClickRemove.bind(this);
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

	/* When start to Drag set a Block name as ID */
	onDragStart = (ev, blockId) => {
    ev.dataTransfer.setData("blockId", blockId);
	}

	onDragOver = (ev) => {
    ev.preventDefault();
  }

  handleOnClickProperties(e, row){
    let modalVisibility = false;
    if(row>-1) {
      modalVisibility = true;
    }
    this.setState({
      modalVisibility,
      websiteDraggableConfig: {
        itemSelected: row
      }
    });
  }

  handleOnClickRemove(e, row){
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    newWebsiteDraggable.splice(row, 1);

    this.setState({
      websiteDraggable: newWebsiteDraggable
    });
  }

  handleCloseProperties(){
    this.setState({modalVisibility: false});
  }

  /* */
  getItemSelectedModulesList(blockId){
    let itemSelected = {};
    this.state.modulesList.forEach((item,key) => {
			if (item.moduleKey === blockId) {
				itemSelected = item;
			}
    });
    return itemSelected;
  }
  
  insertItemSelectedToWebsiteDraggable(itemSelected, row){
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    newWebsiteDraggable.splice(row,0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable
    });
  }

  insertModuleToWebsiteDraggable(blockId,row){
    let itemSelected = this.getItemSelectedModulesList(blockId);
    this.insertItemSelectedToWebsiteDraggable(itemSelected, row);
  }

  changePositionWebsiteDraggable(blockId,row){
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = newWebsiteDraggable[blockId];
    newWebsiteDraggable.splice(blockId, 1);
    newWebsiteDraggable.splice(row,0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable
    });
  }

  removeItemWebsiteDraggable(blockId,row){
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = newWebsiteDraggable[blockId];
    newWebsiteDraggable.splice(blockId, 1);
    newWebsiteDraggable.splice(row,0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable
    });
  }

	/* When is Drop insert the Block */
	onDrop = (ev, row) => {
		let blockId = ev.dataTransfer.getData("blockId");
  
    if(blockId.indexOf("Module")===0) {
      this.insertModuleToWebsiteDraggable(blockId,row);
    }
    else {
      this.changePositionWebsiteDraggable(blockId,row);
    }
	}

	createTable = () => {
		return(
			<table>
				<tbody>
					{this.createContentTable()}
				</tbody>
			</table>
		)
  }

  getModuleComponent(moduleItem, properties) {
    const moduleKey = moduleItem.moduleKey;
    const moduleSrc = moduleItem.moduleSrc;
    switch(moduleKey) {
      case 'ModuleTitleDescription': return <ModuleTitleDescription {...this.props} moduleSrc={moduleSrc} properties={properties} setModuleProperties={this.setModuleProperties}/>
      case 'ModuleLink': return <ModuleLink {...this.props} moduleSrc={moduleSrc} properties={properties} setModuleProperties={this.setModuleProperties}/>
      case 'ModuleImage': return <ModuleImage {...this.props} moduleSrc={moduleSrc} properties={properties} setModuleProperties={this.setModuleProperties}/>
      case 'ModuleSocialNetwork': return <ModuleSocialNetwork moduleSrc={moduleSrc} properties={properties}/>
      case 'ModuleFacebookSendMessage': return <ModuleFacebookSendMessage moduleSrc={moduleSrc} properties={properties}/>
      default:
        return null;
    }
  }

  createWebsiteDraggable = () => {
    const i=0;
    return (
      <div>
        {this.state.websiteDraggable.map((item,key)=>
          <div 
            className="module-box"
            key={key}
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>{this.onDrop(e, key)}}
            onDragStart = {(e) => this.onDragStart(e, key)}
            draggable
            >
            <button onClick={(e) => this.handleOnClickRemove(e,key)} className="btn-delete">X</button>
            <div onClick={(e) => this.handleOnClickProperties(e,key)}>
              {this.getModuleComponent(item, false)}
            </div>
          </div>
        )}
        <div 
          className="module-box"
          key={i}
          onDragOver={(e)=>this.onDragOver(e)}
          onDrop={(e)=>{this.onDrop(e, i)}}
          onDragStart = {(e) => this.onDragStart(e, i)}
          >
          <div className="message">Drag and drop the modules here</div>
        </div>
      </div>
    )
  }
  
  showModuleProperties(){
    const itemSelected = this.state.websiteDraggableConfig.itemSelected;
    const moduleItem = this.state.websiteDraggable[itemSelected];
    return (this.getModuleComponent(moduleItem, true));
  }

  setModuleProperties(moduleSrc){
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = this.state.websiteDraggableConfig.itemSelected;
    newWebsiteDraggable[itemSelected].moduleSrc = moduleSrc;
    this.setState({
      websiteDraggable: newWebsiteDraggable
    })
  }

  showModal() {
    const itemSelected = this.state.websiteDraggableConfig.itemSelected;
    const moduleTitle = this.state.websiteDraggable[itemSelected].moduleTitle;
    return (  
      <div className="modal-wrapper">
        <div className="modal-box">
          <div className="modal-header">{moduleTitle} <button onClick={this.handleCloseProperties} className="btn small">Close</button></div>  
          <div className="modal-content">{this.showModuleProperties()}</div>
          <div className="modal-footer"><button onClick={this.handleCloseProperties} className="btn btn-primary">Ok</button></div>
        </div>
      </div>
    );
  }

  getTemplates(){
    return (
      <div>
        {this.state.websiteTemplates.map((item,key) => 
          <div key={key}>{item.title}</div>
        )}
      </div>
    )
  }

  render() {
    console.log('this.state: ',this.state);
    return (
      <div className="tertiary-style">
        <div className="container padding-20">
          <div className="container-header">
            <div className="left">
              <h2>Website Editor</h2>
            </div>
            <div className="right">
              <input type="text" /> <Link to={`/pro/${this.state.websiteId}`} className="btn btn-secondary">Save</Link> 
            </div>
          </div>
          <div className="container-content">
            <div className="editor-wrapper">
              <div className="col-4">
                <div className="box-wrapper">
                  <div className="box-header">Modules</div>
                  <div className="box-container">
                    <div className="modules-list">
                      {
                        this.state.modulesList.map((moduleItem,key) => 
                          <div key={key}>
                            <div className="modules-list-header">{moduleItem.moduleTitle}</div>
                            <div className="module-box" 
                              onDragStart = {(e) => this.onDragStart(e, moduleItem.moduleKey)}
                              draggable
                            >
                              <div>{this.getModuleComponent(moduleItem, false)}</div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="box-wrapper">
                  <div className="box-header">Editor</div>
                  <div className="box-container">
                    {this.createWebsiteDraggable()}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="box-wrapper">
                  <div className="box-header">Templates</div>
                  <div className="box-container">
                    {this.getTemplates()}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="box-wrapper">
                  <div className="box-header">Preview</div>
                  <div className="box-container">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer className="footer"/>
        {(this.state.modalVisibility===true) ? this.showModal(): null }
      </div>
    );
  }
}

export default WebsiteEdit;