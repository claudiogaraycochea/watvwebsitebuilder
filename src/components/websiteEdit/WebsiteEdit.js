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
        maxRow: 1,
        itemSelected: null,
      },
      modulesList: [
        {
          moduleKey: 'ModuleLink',
          moduleTitle: 'Simple Link',
          modulePosition: null,
          moduleSrc: {
            title:'Testing',
            buttonLink: 'http://jjjjj.com',
            buttonTitle: ''
          }
        },
        {
          moduleKey: 'ModuleSocialNetwork',
          moduleTitle: 'Social Network',
          modulePosition: null,
          moduleSrc: {
            title: 'Follow us',
            link_facebook: '',
            link_twitter: '',
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
        },
        {
          moduleKey: 'ModuleRealtimeReactions',
          moduleTitle: 'Realtime Reactions',
          modulePosition: null,
          moduleSrc: {
            title: 'Realtime Reactions',
            reactions: 'happy, sad, like, love',
          }
        },
      ],
      modalVisibility: false,
    };
    this.handleOnClickProperties = this.handleOnClickProperties.bind(this);
    this.handleCloseProperties = this.handleCloseProperties.bind(this);
    this.setModuleProperties = this.setModuleProperties.bind(this);
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
        maxRow: this.state.websiteDraggableConfig.maxRow,
        itemSelected: row
      }
    });
  }

  handleCloseProperties(){
    this.setState({modalVisibility: false});
  }

  getSelectedModulesList(blockId){
    let itemSelected = {};
    this.state.modulesList.forEach((item,key) => {
			if (item.moduleKey === blockId) {
				itemSelected = item;
			}
    });
    return itemSelected;
  }
  
  insertItemSelectedToWebsiteDraggable(itemSelected, row){
    let websiteDraggable = { ...this.state.websiteDraggable };
    let newWebsiteDraggable = [];
    let data = [];
    let movePosition = false;
    let nextPosition = -1;
    let maxRow = this.state.websiteDraggableConfig.maxRow;
    for (let i = 0; i < this.state.websiteDraggableConfig.maxRow; i++) {
     
      if(i===row){

        if(websiteDraggable[i]!==undefined){
          movePosition = true;
        }
        
        data = {
          modulePosition: row,
          moduleKey: itemSelected.moduleKey,
          moduleTitle: itemSelected.moduleTitle,
          moduleSrc: itemSelected.moduleSrc
        }
        newWebsiteDraggable[i]=data;

      }

      if(movePosition===true){
        if(nextPosition===-1){
          nextPosition = i;
        }
      }
      else {
        if(websiteDraggable[i]!==undefined) {
          newWebsiteDraggable[i] = websiteDraggable[i];
        }
      }
    };

    if(movePosition===true) {
      console.log('mover todo el array desde ', nextPosition);
      for (let i = nextPosition; i < this.state.websiteDraggableConfig.maxRow; i++) {
        if(websiteDraggable[i]!==undefined) {
          
            data = {
              modulePosition: (i+1),
              moduleKey:  websiteDraggable[i].moduleKey,
              moduleTitle: websiteDraggable[i].moduleTitle,
              moduleSrc: websiteDraggable[i].moduleSrc
            }
            newWebsiteDraggable[(i+1)]=data;
            if((i+1)===this.state.websiteDraggableConfig.maxRow){
              maxRow = this.state.websiteDraggableConfig.maxRow+1;
            }
        }
      }
    }
    
    maxRow = this.state.websiteDraggableConfig.maxRow+1;
    
    console.log('newWebsiteDraggable: ',newWebsiteDraggable);
    this.setState({
      websiteDraggable: newWebsiteDraggable,
      websiteDraggableConfig: {
        maxRow,
      }
    });

  }

  insertModuleToWebsiteDraggable(blockId,row){
    //console.log('insertModuleToWebsiteDraggable: blockId:',blockId,' row:',row);
    let itemSelected = this.getSelectedModulesList(blockId);
    this.insertItemSelectedToWebsiteDraggable(itemSelected, row);
  }

  changePositionWebsiteDraggable(blockId,row){
    //console.log('changePositionWebsiteDraggable: blockId:',blockId,' row:',row);
  }

	/* When is Drop insert the Block */
	onDrop = (ev, row) => {
		let blockId = ev.dataTransfer.getData("blockId");
    //this.insertBlockToWorkflow(blockId,row,col);
    
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
  
  getItemFromWebsiteDraggable(rowPosition) {
    let moduleItem = {};
		this.state.websiteDraggable.forEach((item,key) => {
			if (item.modulePosition === rowPosition) {
				moduleItem = item;
			}
		});
		return moduleItem;
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
    let websiteDraggableList = [];
    for (let i = 0; i < this.state.websiteDraggableConfig.maxRow; i++) {
      let moduleItem = this.getItemFromWebsiteDraggable(i);
      websiteDraggableList.push(
        <div 
          className="module-box"
          key={i}
          onDragOver={(e)=>this.onDragOver(e)}
          onDrop={(e)=>{this.onDrop(e, i)}}
          onDragStart = {(e) => this.onDragStart(e, i)}
          draggable
          onClick={(e) => this.handleOnClickProperties(e,i)}
          >
          {(!moduleItem.moduleKey) ? <div className="message">Drag and drop the modules here</div> : this.getModuleComponent(moduleItem, false) }
        </div>)
    }
		return(
			<div>
				{websiteDraggableList}
			</div>
		)
  }
  
  openModal(){
    const itemSelected = this.state.websiteDraggableConfig.itemSelected;
    const moduleItem = this.getItemFromWebsiteDraggable(itemSelected);
    console.log('_____________________________ PROPERTIES:',moduleItem.moduleSrc);
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
          <div className="modal-content">{this.openModal()}</div>
          <div className="modal-footer"><button onClick={this.handleCloseProperties} className="btn btn-primary">Ok</button></div>
      </div>
      </div>
    );
  }

  render() {
    console.log('>>>******************>>>this.state: ',this.state);
    //console.log('dragable https://github.com/claudiogaraycochea/draganddrop/blob/master/components/workflowTemplateEditor/WorkflowTemplateEditor.js');
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
                        this.state.modulesList.map((moduleItem,i) => 
                          <div className="module-box" key={i}
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