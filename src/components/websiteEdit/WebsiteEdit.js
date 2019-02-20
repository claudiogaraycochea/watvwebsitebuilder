import React, { Component } from 'react';
import './WebsiteEdit.css';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';

import ModuleLink from '../modules/moduleLink/ModuleLink';
import ModuleSocialNetwork from '../modules/moduleSocialNetwork/ModuleSocialNetwork';
import ModuleFacebookSendMessage from '../modules/moduleFacebookSendMessage/ModuleFacebookSendMessage';

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
          modulePosition: 0,
          moduleSrc: {
            title: 'Visit us',
            description: 'List of channels',
            link: 'http://booking.com',
          }
        },
        {
          moduleKey: 'ModuleFacebookSendMessage',
          moduleTitle: 'Facebook Send Message',
          modulePosition: null,
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

	/* When start to Drag set a Block name as ID */
	onDragStart = (ev, blockId) => {
    ev.dataTransfer.setData("blockId", blockId);
    console.log('onDragStart - Element selected',blockId);
	}

	onDragOver = (ev) => {
    ev.preventDefault();
    console.log('onDragOver');
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
    let newWebsiteDraggable = JSON.stringify(this.state.websiteDraggable);
    newWebsiteDraggable = JSON.parse(newWebsiteDraggable);
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
    let newWebsiteDraggable = JSON.stringify(this.state.websiteDraggable);
    newWebsiteDraggable = JSON.parse(newWebsiteDraggable);
    newWebsiteDraggable.splice(row,0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable
    });
  }

  insertModuleToWebsiteDraggable(blockId,row){
    //console.log('insertModuleToWebsiteDraggable: blockId:',blockId,' row:',row);
    let itemSelected = this.getItemSelectedModulesList(blockId);
    this.insertItemSelectedToWebsiteDraggable(itemSelected, row);
  }

  changePositionWebsiteDraggable(blockId,row){
    //console.log('changePositionWebsiteDraggable: blockId:',blockId,' row:',row);
    let newWebsiteDraggable = JSON.stringify(this.state.websiteDraggable);
    newWebsiteDraggable = JSON.parse(newWebsiteDraggable);
    let itemSelected = newWebsiteDraggable[blockId];
    newWebsiteDraggable.splice(blockId, 1);
    newWebsiteDraggable.splice(row,0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable
    });
  }

  removeItemWebsiteDraggable(blockId,row){
    //console.log('changePositionWebsiteDraggable: blockId:',blockId,' row:',row);
    let newWebsiteDraggable = JSON.stringify(this.state.websiteDraggable);
    newWebsiteDraggable = JSON.parse(newWebsiteDraggable);
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
      case 'ModuleLink':
        return <ModuleLink {...this.props} moduleSrc={moduleSrc} properties={properties} setModuleProperties={this.setModuleProperties}/>
      case 'ModuleSocialNetwork':
        return <ModuleSocialNetwork moduleSrc={moduleSrc} properties={properties}/>
      case 'ModuleFacebookSendMessage':
        return <ModuleFacebookSendMessage moduleSrc={moduleSrc} properties={properties}/>
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
    console.log('PROPERTIES:',moduleItem.moduleSrc);
    return (this.getModuleComponent(moduleItem, true));
  }

  setModuleProperties(moduleSrc){
    let newWebsiteDraggable = this.state.websiteDraggable;
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
    console.log('>>this.state: ',this.state);
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
                          <div className="module-box" key={key}
                            onDragStart = {(e) => this.onDragStart(e, moduleItem.moduleKey)}
                            draggable
                          >
                            {moduleItem.moduleTitle}
                            {this.getModuleComponent(moduleItem, false)}
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