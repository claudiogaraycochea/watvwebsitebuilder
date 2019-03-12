import React, { Component } from 'react';
import './WebsiteEdit.css';
import Footer from '../footer/Footer';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import * as commons from '../../commons/Commons';
import '../../commons/Fonts.css';
import '../../commons/Module.css';

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
          moduleTitle: 'Title Description',
          moduleSrc: {
            title: 'Title',
            description: 'Description',
          }
        },
        {
          moduleKey: 'ModuleImage',
          moduleTitle: 'Image',
          moduleSrc: {
            imageURL: '',
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
            title: 'Follow usyyy',
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
              backgroundColor: '#ff0000',
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
              backgroundColor: '#ff0022',
              fontColor: '#ffffff',
            }
          },
        },
        {
          title: 'MyTemplate 2',
          styles: {
            background: {
              backgroundColor: '#3392FF',
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
              backgroundColor: '#339222',
              fontColor: '#ffffff',
            }
          },
        },
        {
          title: 'MyTemplate 3',
          styles: {
            background: {
              backgroundColor: '#FF9300',
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
              backgroundColor: '#FF9300',
              fontColor: '#fff333',
            }
          },
        },
      ],
      templateSelected: 0,
      templateChange: 'template_selector',
      runSrc: {},
      fontSizeValue: ['10','15','20','25','30','40'],
      runSrcSaved: false,
    };
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
        const data = commons.copyObj(response.data);
        const runSrc = JSON.parse(data.run_src);
        const components = runSrc.components;
        const template = runSrc.template;
    
        this.setState({
          websiteData: data,
          websiteDraggable: components,
          runSrc: {
            components: components,
            template: template,
          }
        });
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

  handleModuleProperties = (e, row) => {
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

  handleModuleRemove = (e, row) => {
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

  handleCloseModuleProperties = () => {
    this.setState({modalVisibility: false});
  }

  handleSelectTemplate(e, row) {
    this.setState({
      templateSelected: row,
      templateChange: 'template_properties',
      runSrc: {
        ...this.state.runSrc,
        template: this.state.websiteTemplates[row],
      }
    });
  }

  handleSaveChanges = (e) => {
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');
    const websiteId = this.state.websiteId;
    const runSrc = JSON.stringify(this.state.runSrc);
    let postData='data='+runSrc+'&website_id='+websiteId+'&user_id='+userId+'&user_token='+userToken;
    console.log('Save changes',postData);
    axios.post(`${API_URL}setRun/`,postData)
      .then(response => {
        if(response.data.result==='true') {
          this.setState({
            runSrcSaved: true
          })          
        }
      })
      .catch(error => {});
  }

//
// GET MODULE 
//

  getModuleComponent(moduleItem, properties, showStyle) {
    const moduleKey = moduleItem.moduleKey;
    const moduleSrc = moduleItem.moduleSrc;
    switch(moduleKey) {
      case 'ModuleTitleDescription': 
        return <ModuleTitleDescription 
          {...this.props}
          moduleSrc={moduleSrc}
          properties={properties}
          setModuleProperties={this.setModuleProperties}
          runSrc={this.state.runSrc}
          showStyle={showStyle}/>
      case 'ModuleLink': 
        return <ModuleLink 
          {...this.props}
          moduleSrc={moduleSrc}
          properties={properties}
          setModuleProperties={this.setModuleProperties}
          runSrc={this.runSrc}/>
      case 'ModuleImage': 
        return <ModuleImage 
          {...this.props} 
          moduleSrc={moduleSrc}
          properties={properties}
          setModuleProperties={this.setModuleProperties}
          runSrc={this.runSrc}/>
      case 'ModuleSocialNetwork': 
        return <ModuleSocialNetwork 
          moduleSrc={moduleSrc} 
          properties={properties}
          setModuleProperties={this.setModuleProperties}
          runSrc={this.runSrc}/>
      case 'ModuleFacebookSendMessage':
        return <ModuleFacebookSendMessage 
          moduleSrc={moduleSrc}
          properties={properties}
          runSrc={this.runSrc}/>
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
            draggable>
            <button onClick={(e) => this.handleModuleRemove(e,key)} className="btn-delete"><i className="icon-trash"></i></button>
            <div onClick={(e) => this.handleModuleProperties(e,key)} className="no-click-event"></div>
            <div>
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

  setModuleProperties = (moduleSrc) => {
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
          <div className="modal-header">{moduleTitle} <button onClick={this.handleCloseModuleProperties} className="btn small">Close</button></div>  
          <div className="modal-content">{this.showModuleProperties()}</div>
          <div className="modal-footer"><button onClick={this.handleCloseModuleProperties} className="btn btn-primary">Ok</button></div>
        </div>
      </div>
    );
  }

//
// TEMPLATES
//

  converterValue = (typeValue, value) =>{
    if(typeValue==='fontSize')
      return parseInt(value);
    return value;
  }

  handleTemplateChange = (e) => {

    console.log('e.target.value', e.target.value);
    let toModify = e.target.name.split('.');
    console.log(toModify.length,' --- ', toModify[0], ' --- ',toModify[1]);

    const styles = commons.copyObj(this.state.runSrc.template.styles); 
    let background = styles.background;
    if(toModify[0]==='background') {
      background[toModify[1]] = this.converterValue(toModify[1],e.target.value);
    }
    let title = styles.title;
    if(toModify[0]==='title') {
      title[toModify[1]] = this.converterValue(toModify[1],e.target.value);
    }
    let subtitle = styles.subtitle;
    if(toModify[0]==='subtitle') {
      subtitle[toModify[1]] = this.converterValue(toModify[1],e.target.value);
    }
    let button = styles.button;
    if(toModify[0]==='button') {
      button[toModify[1]] = this.converterValue(toModify[1],e.target.value);
    }

    const runSrc = {
      components: this.state.runSrc.components,
      template : {
        title: this.state.runSrc.template.title,
        styles: {
          background: background,
          title: title,
          subtitle: subtitle,
          button: button,
        }
      }
    };

    console.log('shandleTemplateChange:',runSrc);

    this.setState({
      ...this.state,
      runSrc,
    });

  }

  getTemplateProperties(){
    const styles = this.state.runSrc.template.styles;//commons.copyObj(this.state.websiteTemplates[this.state.templateSelected].styles);
    console.log('templateProperties: templateSrc.styles: ', styles.background.backgroundColor);
    return (
      <div className="container-content">
        <div className="row">
          <button onClick={() => this.goToTemplates('template_selector')}>Templates</button>
        </div>
        <div className="row">
          <div className="col-2">Background</div>
          <div className="col-2">
            <input type="color" name="background.backgroundColor" defaultValue={styles.background.backgroundColor} onChange={(e)=>{this.handleTemplateChange(e)}} /> 
          </div>
        </div>
        <div className="row">
          <div className="col-2">Font size global</div>
          <div className="col-2">
            <select className="inp" name="background.fontSize" defaultValue={styles.background.fontSize} onChange={(e)=>{this.handleTemplateChange(e)}}>
              { this.state.fontSizeValue.map((item)=><option value={item}>{item}</option>) }
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-2">Font size title</div>
          <div className="col-2">
            <select className="inp" name="title.fontSize" defaultValue={styles.background.fontSize} onChange={(e)=>{this.handleTemplateChange(e)}}>
              { this.state.fontSizeValue.map((item)=><option value={item}>{item}</option>) }
            </select>
            {/*<input type="text" name="title.fontSize" defaultValue={this.state.runSrc.template.styles.title.fontSize} onChange={(e)=>{this.handleTemplateChange(e)}} /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-2">Button Color</div>
          <div className="col-2">
            <input type="color" name="button.backgroundColor" defaultValue={styles.button.backgroundColor} onChange={(e)=>{this.handleTemplateChange(e)}} /> 
          </div>
        </div>
        <div className="row">
          <div className="col-2">Font Size Button</div>
          <div className="col-2">
            <select className="inp" name="button.fontSize" defaultValue={styles.button.fontSize} onChange={(e)=>{this.handleTemplateChange(e)}}>
              { this.state.fontSizeValue.map((item)=><option value={item}>{item}</option>) }
            </select>
          </div>
        </div>
      </div>
    )
  }

  getTemplateSelector = () => {
    return (
      <div className="template-wrapper">
        {this.state.websiteTemplates.map((item,key) => 
          <div className="item" key={key} onClick={(e) => this.handleSelectTemplate(e,key)}>{item.title}</div>
        )}
      </div>
    )
  }

  getTemplates(){
    if(this.state.templateChange==='template_properties'){
      return this.getTemplateProperties();
    }
    if(this.state.templateChange==='template_selector') {
      return this.getTemplateSelector();
    }
  }

  goToTemplates = (templateChange) => {
    this.setState({templateChange});
  }

//
// PREVIEW
//

  getPreview(){
    if(Object.keys(this.state.runSrc).length === 0) 
      return (<div>Empty</div>)
    else {
      const styles = this.state.runSrc.template.styles;
      const showStyle = true;
      return (
        <div 
          className="mod-run" 
          style={styles.background}
          >
          {this.state.runSrc.components.map((item,key)=>
            <div key={key}
              className="mod-box"
              >
              {this.getModuleComponent(item, false, showStyle)}
            </div>
          )}
        </div>
      )       
    }
  }

//
// RENDER
//

  render() {
    console.log(this.state);
    return (
      <div className="tertiary-style">
        <div className="container padding-lr">
          <div className="container-header">
            <div className="col-2">
              <h2>Website Editor</h2>
            </div>
            <div className="col-2 inline">
              <div className="website-url-wrapper">
                { this.state.runSrcSaved ? <div className="saved-successfully">Successfully saved!</div> : null }
                <input type="text" className="website-url inp" defaultValue={`https://modules.weband.tv/pro/${this.state.websiteId}`} /> 
              </div>
              <button onClick={this.handleSaveChanges} className="btn btn-primary"><i className="icon-save space"/> Save Changes</button>
            </div>
          </div>
          <div>
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
                              <div className="no-click-event"></div>
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