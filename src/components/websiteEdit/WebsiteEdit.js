import React, { Component } from 'react';
import './WebsiteEdit.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import * as commons from '../../commons/Commons';
import '../../commons/Fonts.css';

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
        stateUpdated: false,
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
            imageSize: 'small',
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
          styles: {
            background: {
              backgroundColor: 'red',
              fontSize: 20,
              fontFamily: 'Bitter',
            },
            title: {
              fontSize: 50,
            },
            subtitle: {
              fontSize: 20,
            },
            button: {
              backgroundColor: 'red',
              fontColor: 'orange',
            }
          },
        },
        {
          title: 'MyTemplate 2',
          styles: {
            background: {
              backgroundColor: 'blue',
              fontSize: 10,
              fontFamily: 'Ubuntu',
              color: 'violet',
            },
            title: {
              fontSize: 50,
            },
            subtitle: {
              fontSize: 20,
            },
            button: {
              backgroundColor: 'red',
              fontColor: 'orange',
            }
          },
        },
        {
          title: 'MyTemplate 3',
          styles: {
            background: {
              backgroundColor: 'yellow',
              fontSize: 10,
              fontFamily: 'Open Sans',
              color: 'blue',
            },
            title: {
              fontSize: 50,
            },
            subtitle: {
              fontSize: 20,
            },
            button: {
              backgroundColor: 'red',
              fontColor: 'orange',
            }
          },
        },
      ],
      templateSelected: 0,
      templateChange: false,
      runSrc: {},
    };
    this.handleOnClickProperties = this.handleOnClickProperties.bind(this);
    this.handleCloseProperties = this.handleCloseProperties.bind(this);
    this.setModuleProperties = this.setModuleProperties.bind(this);
    this.handleOnClickRemove = this.handleOnClickRemove.bind(this);
    this.handleOnClickTemplate = this.handleOnClickTemplate.bind(this);
    this.handleBackToTemplate = this.handleBackToTemplate.bind(this);
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

//
// DRAGG AND DROP
//

	/* When start to Drag set a Block name as ID */
	onDragStart = (ev, blockId) => {
    ev.dataTransfer.setData("blockId", blockId);
	}

	onDragOver = (ev) => {
    ev.preventDefault();
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

//
// ON CLICK EVENTS
//

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
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected],
      }
    });
  }

  handleCloseProperties(){
    this.setState({modalVisibility: false});
  }

  handleOnClickTemplate(e, row){
    this.setState({
      templateSelected: row,
      templateChange: true,
      runSrc: {
        ...this.state.runSrc,
        template: this.state.websiteTemplates[row],
      }
    });
  }

  handleBackToTemplate(e){
    console.log('eeeeee');
    this.setState({
      templateChange: false,
    });
  }

//
// GET MODULE 
//

  getModuleComponent(moduleItem, properties, showStyle) {
    const moduleKey = moduleItem.moduleKey;
    const moduleSrc = moduleItem.moduleSrc;
    switch(moduleKey) {
      case 'ModuleTitleDescription': return <ModuleTitleDescription {...this.props} moduleSrc={moduleSrc} properties={properties} setModuleProperties={this.setModuleProperties} runSrc={this.state.runSrc} showStyle={showStyle}/>
      case 'ModuleLink': return <ModuleLink {...this.props} moduleSrc={moduleSrc} properties={properties} setModuleProperties={this.setModuleProperties} runSrc={this.runSrc}/>
      case 'ModuleImage': return <ModuleImage {...this.props} moduleSrc={moduleSrc} properties={properties} setModuleProperties={this.setModuleProperties} runSrc={this.runSrc}/>
      case 'ModuleSocialNetwork': return <ModuleSocialNetwork moduleSrc={moduleSrc} properties={properties} runSrc={this.runSrc}/>
      case 'ModuleFacebookSendMessage': return <ModuleFacebookSendMessage moduleSrc={moduleSrc} properties={properties} runSrc={this.runSrc}/>
      default:
        return null;
    }
  }

//
// WEBSITE DRAGGABLE
//

  changePositionWebsiteDraggable(blockId,row){
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = newWebsiteDraggable[blockId];
    newWebsiteDraggable.splice(blockId, 1);
    newWebsiteDraggable.splice(row,0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected],
      }
    });
  }

  removeItemWebsiteDraggable(blockId,row){
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = newWebsiteDraggable[blockId];
    newWebsiteDraggable.splice(blockId, 1);
    newWebsiteDraggable.splice(row,0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected],
      }
    });
  }

  getItemSelectedModulesList(blockId){
    let itemSelected = {};
    this.state.modulesList.forEach((item,key) => {
      if (item.moduleKey === blockId) {
        itemSelected = item;
      }
    });
    return itemSelected;
  }

  insertModuleToWebsiteDraggable(blockId,row){
    let item = this.getItemSelectedModulesList(blockId);
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    newWebsiteDraggable.splice(row,0, item);

    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected],
      }
    });
  }

  createWebsiteDraggable(){
    const i = 0;
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
              {this.getModuleComponent(item, false, false)}
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

//
// MODULE PROPERTIES
//

  showModuleProperties(){
    const itemSelected = this.state.websiteDraggableConfig.itemSelected;
    const moduleItem = this.state.websiteDraggable[itemSelected];
    return (this.getModuleComponent(moduleItem, true, false));
  }

  setModuleProperties(moduleSrc){
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = this.state.websiteDraggableConfig.itemSelected;
    newWebsiteDraggable[itemSelected].moduleSrc = moduleSrc;
    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected],
      }
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

//
// TEMPLATES
//
  getTemplateProperties(){
    const templateSrc = commons.copyObj(this.state.websiteTemplates[this.state.templateSelected].templateSrc);
    console.log('templateProperties: ',templateSrc)
    return (
      <div>
        Properties
        <button onClick={(e)=>this.handleBackToTemplate(e)}>Choose template</button>
        <div>
          <label>Background</label>
          <input type="text" /> 
        </div>
        <div>
          <label>Font Family</label>
          <input type="text" />
        </div>
      </div>
    )
  }

  getTemplates(){
    //(this.state.templateChange) ? this.getTemplateProperties() : this.getTemplates() 
    return (
      <div className="template-wrapper">
        {this.state.websiteTemplates.map((item,key) => 
          <div className="item" key={key} onClick={(e) => this.handleOnClickTemplate(e,key)}>{item.title}</div>
        )}
      </div>
    )
  }

//
// PREVIEW
//

  getPreview(){
    //console.log('*** Styles :',styles);
    console.log('this.state.runSrc: ',this.state.runSrc);
    if(Object.keys(this.state.runSrc).length === 0) 
      return (<div>Empty</div>)
    else {
      const styles = this.state.runSrc.template.styles;
      const showStyle = true;
      return (
        <div 
          className="module-view" 
          style={styles.background}
          >
          {this.state.runSrc.components.map((item,key)=>
            <div key={key}
              className="box"
              >
              {this.getModuleComponent(item, false, showStyle)}
            </div>
          )}
        </div>
      )       
    }
  }

//
// RUN SRC
//

  /*runSrcUpdate(){
    console.log('runSrcUpdate');
    const runSrc = {
      components: this.state.websiteDraggable,
      template: this.state.websiteTemplates[this.state.templateSelected],
    }
    this.setState({
      runSrc,
      websiteDraggableConfig: {
        stateUpdated: false,
      }
    })
  }*/

//
// RENDER
//

  render() {
    console.log(this.state);
    if(this.state.websiteDraggableConfig.stateUpdated===true) {
      this.runSrcUpdate();
    }
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
                              <div>{this.getModuleComponent(moduleItem, false, false)}</div>
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
                    {this.getPreview()}
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