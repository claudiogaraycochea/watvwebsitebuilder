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
          moduleKey: 'module_link',
          moduleTitle: 'Simple Link',
          modulePosition: 0,
          moduleSrc: {
            title: 'Visit us',
            description: 'List of channels',
            link: 'http://booking.com',
          }
        },
        {
          moduleKey: 'module_link',
          moduleTitle: 'Simple Link',
          modulePosition: 1,
          moduleSrc: {
            title: 'Visit us',
            description: 'List of channels',
            link: 'http://booking.com',
          }
        }*/
      ],
      websiteDraggableConfig: {
        maxRow: 5,
      },
      modulesList: [
        {
          moduleKey: 'ModuleLink',
          moduleTitle: 'Simple Link',
          modulePosition: null,
          moduleSrc: {
            title: 'Visit us',
            description: 'List of channels',
            link: 'http://booking.com',
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

	/* When start to Drag set a Block name as ID */
	onDragStart = (ev, blockId) => {
    ev.dataTransfer.setData("blockId", blockId);
    console.log('onDragStart - Element selected',blockId);
	}

	onDragOver = (ev) => {
    ev.preventDefault();
    console.log('onDragOver');
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
          console.log('tiene contenido');
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
        console.log('movePosition', movePosition);
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
            console.log('mover uno mas abajo',websiteDraggable[i]);
            if((i+1)===this.state.websiteDraggableConfig.maxRow){
              maxRow = this.state.websiteDraggableConfig.maxRow+1;
            }
        }
      }
    }
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
          >
          {i} {moduleItem.moduleKey}
          {('ModuleLink' === moduleItem.moduleKey) ? <ModuleLink /> : null }
          {('ModuleSocialNetwork' === moduleItem.moduleKey) ? <ModuleSocialNetwork /> : null }
          {('ModuleFacebookSendMessage' === moduleItem.moduleKey) ? <ModuleFacebookSendMessage /> : null }
        </div>)
    }
		return(
			<div>
				{websiteDraggableList}
			</div>
		)
	}

  render() {
    //console.log('>>>******************>>>this.state: ',this.state);
    //console.log('dragable https://github.com/claudiogaraycochea/draganddrop/blob/master/components/workflowTemplateEditor/WorkflowTemplateEditor.js');
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
          <div className="editor-wrapper">
            <div className="module-wrapper">
              <div className="modules-list">
                {
                  this.state.modulesList.map((item,i) => 
                    <div className="module-box" key={i}
                      onDragStart = {(e) => this.onDragStart(e, item.moduleKey)}
									    draggable
                    >
                      {/*item.moduleKey*/} 
                      {item.moduleTitle}
                      {('ModuleLink' === item.moduleKey) ? <ModuleLink /> : null }
                      {('ModuleSocialNetwork' === item.moduleKey) ? <ModuleSocialNetwork /> : null }
                      {('ModuleFacebookSendMessage' === item.moduleKey) ? <ModuleFacebookSendMessage /> : null }
                    </div>  
                  )
                }
              </div>             
            </div>
            <div className="drag-wrapper">
                {this.createWebsiteDraggable()}
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