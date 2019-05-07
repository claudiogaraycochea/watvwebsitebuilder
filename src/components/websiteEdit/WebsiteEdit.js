import React, { Component } from "react";
import "./WebsiteEdit.css";
import Footer from "../footer/Footer";
//import { Link } from 'react-router-dom';
import axios from "axios";
import { API_URL } from "../../constants";
import * as commons from "../../commons/Commons";
import "../../commons/Fonts.css";
import "../../commons/Module.css";
import { modulesList, websiteTemplates } from "./ModuleList";
import Modal from "../modal/Modal";

import ModuleLink from "../modules/moduleLink/ModuleLink";
import ModuleSocialNetwork from "../modules/moduleSocialNetwork/ModuleSocialNetwork";
import ModuleFacebookSendMessage from "../modules/moduleFacebookSendMessage/ModuleFacebookSendMessage";
import ModuleTitleDescription from "../modules/moduleTitleDescription/ModuleTitleDescription";
import ModuleImage from "../modules/moduleImage/ModuleImage";
import ModuleBuyNow from "../modules/moduleBuyNow/ModuleBuyNow";
import ModuleDownloadApp from "../modules/moduleDownloadApp/ModuleDownloadApp";
import ModuleVote from "../modules/moduleVote/ModuleVote";
import ModuleRealtimeReactions from "../modules/moduleRealtimeReactions/ModuleRealtimeReactions";

class WebsiteEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstname: "",
      websiteList: [],
      websiteId: "",
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
        stateUpdated: false
      },
      modulesList: modulesList,
      modalVisibility: false,
      websiteTemplates: websiteTemplates,
      templateSelected: 0,
      templateChange: "template_selector",
      runSrc: {},
      fontSizeValue: ["10", "15", "20", "25", "30", "40"],
      fontFamilyValue: ["Ubuntu", "Bitter", "Roboto"],
      runSrcSaved: false,
      selectedFile: null,
      backgroundImage: null
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
    axios
      .get(`${API_URL}getRun/?website_id=${websiteId}`)
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
            template: template
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
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  /* When is Drop insert the Block */
  onDrop = (ev, row) => {
    let blockId = ev.dataTransfer.getData("blockId");

    if (blockId.indexOf("Module") === 0) {
      this.insertModuleToWebsiteDraggable(blockId, row);
    } else {
      this.changePositionWebsiteDraggable(blockId, row);
    }
  };

  //
  // ON CLICK EVENTS
  //

  handleModuleProperties = (e, row) => {
    let modalVisibility = false;
    if (row > -1) {
      modalVisibility = true;
    }
    this.setState({
      modalVisibility,
      websiteDraggableConfig: {
        itemSelected: row
      }
    });
  };

  handleModuleRemove = (e, row) => {
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    newWebsiteDraggable.splice(row, 1);

    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected]
      }
    });
  };

  closeModal = () => {
    this.setState({ modalVisibility: false });
  };

  handleSelectTemplate(e, row) {
    this.setState({
      templateSelected: row,
      templateChange: "template_properties",
      runSrc: {
        ...this.state.runSrc,
        template: this.state.websiteTemplates[row]
      }
    });
  }

  handleSaveChanges = e => {
    const userId = sessionStorage.getItem("userId");
    const userToken = sessionStorage.getItem("userToken");
    const websiteId = this.state.websiteId;
    const runSrc = JSON.stringify(this.state.runSrc);
    let postData =
      "data=" +
      runSrc +
      "&website_id=" +
      websiteId +
      "&user_id=" +
      userId +
      "&user_token=" +
      userToken;
    axios
      .post(`${API_URL}setRun/`, postData)
      .then(response => {
        if (response.data.result === "true") {
          this.setState({
            runSrcSaved: true
          });
        }
      })
      .catch(error => {});
  };

  //
  // GET MODULE
  //

  getModuleComponent(data) {
    const moduleKey = data.moduleItem.moduleKey;
    const moduleSrc = data.moduleItem.moduleSrc;
    switch (moduleKey) {
      case "ModuleTitleDescription":
        return (
          <ModuleTitleDescription
            {...this.props}
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      case "ModuleLink":
        return (
          <ModuleLink
            {...this.props}
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      case "ModuleImage":
        return (
          <ModuleImage
            {...this.props}
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      case "ModuleSocialNetwork":
        return (
          <ModuleSocialNetwork
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      case "ModuleFacebookSendMessage":
        return (
          <ModuleFacebookSendMessage
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      case "ModuleBuyNow":
        return (
          <ModuleBuyNow
            {...this.props}
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      case "ModuleDownloadApp":
        return (
          <ModuleDownloadApp
            {...this.props}
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      case "ModuleVote":
        return (
          <ModuleVote
            {...this.props}
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      case "ModuleRealtimeReactions":
        return (
          <ModuleRealtimeReactions
            {...this.props}
            moduleSrc={moduleSrc}
            properties={data.properties}
            setModuleProperties={this.setModuleProperties}
            runSrc={this.state.runSrc}
            styles={data.styles}
            showStyle={data.showStyle}
          />
        );
      default:
        return null;
    }
  }

  //
  // WEBSITE DRAGGABLE
  //

  changePositionWebsiteDraggable(blockId, row) {
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = newWebsiteDraggable[blockId];
    newWebsiteDraggable.splice(blockId, 1);
    newWebsiteDraggable.splice(row, 0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected]
      }
    });
  }

  removeItemWebsiteDraggable(blockId, row) {
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = newWebsiteDraggable[blockId];
    newWebsiteDraggable.splice(blockId, 1);
    newWebsiteDraggable.splice(row, 0, itemSelected);

    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected]
      }
    });
  }

  getItemSelectedModulesList(blockId) {
    let itemSelected = {};
    this.state.modulesList.forEach((item, key) => {
      if (item.moduleKey === blockId) {
        itemSelected = item;
      }
    });
    return itemSelected;
  }

  insertModuleToWebsiteDraggable(blockId, row) {
    let item = this.getItemSelectedModulesList(blockId);
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    newWebsiteDraggable.splice(row, 0, item);

    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected]
      }
    });
  }

  createWebsiteDraggable() {
    const i = 0;
    return (
      <div>
        {this.state.websiteDraggable.map((item, key) => (
          <div
            className="module-box"
            key={key}
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => {
              this.onDrop(e, key);
            }}
            onDragStart={e => this.onDragStart(e, key)}
            draggable
          >
            <button
              onClick={e => this.handleModuleRemove(e, key)}
              className="btn-delete"
            >
              <i className="icon-trash" />
            </button>
            <div
              onClick={e => this.handleModuleProperties(e, key)}
              className="no-click-event"
            />
            <div>{this.getModuleComponent({
              moduleItem: item, 
              properties: false,
              showStyle: false})}</div>
          </div>
        ))}
        <div
          className="module-box"
          key={i}
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDrop(e, i);
          }}
          onDragStart={e => this.onDragStart(e, i)}
        >
          <div className="message">Drag and drop the modules here</div>
        </div>
      </div>
    );
  }

  //
  // MODULE PROPERTIES
  //

  showModuleProperties() {
    const itemSelected = this.state.websiteDraggableConfig.itemSelected;
    const moduleItem = this.state.websiteDraggable[itemSelected];
    const data = {
      moduleItem: moduleItem, 
      properties: true,
      showStyle: false}
    return this.getModuleComponent(data);
  }

  setModuleProperties = moduleSrc => {
    let newWebsiteDraggable = commons.copyObj(this.state.websiteDraggable);
    let itemSelected = this.state.websiteDraggableConfig.itemSelected;
    newWebsiteDraggable[itemSelected].moduleSrc = moduleSrc;
    this.setState({
      websiteDraggable: newWebsiteDraggable,
      runSrc: {
        components: newWebsiteDraggable,
        template: this.state.websiteTemplates[this.state.templateSelected]
      }
    });
  };

  //
  // TEMPLATES
  //

  converterValue = (typeValue, value) => {
    if (typeValue === "fontSize") return parseInt(value);
    return value;
  };

  handleTemplateChange = e => {
    let toModify = e.target.name.split(".");
    const styles = commons.copyObj(this.state.runSrc.template.styles);
    let background = styles.background;
    if (toModify[0] === "background") {
      background[toModify[1]] = this.converterValue(
        toModify[1],
        e.target.value
      );
    }
    let title = styles.title;
    if (toModify[0] === "title") {
      title[toModify[1]] = this.converterValue(toModify[1], e.target.value);
    }
    let subtitle = styles.subtitle;
    if (toModify[0] === "subtitle") {
      subtitle[toModify[1]] = this.converterValue(toModify[1], e.target.value);
    }
    let button = styles.button;
    if (toModify[0] === "button") {
      button[toModify[1]] = this.converterValue(toModify[1], e.target.value);
    }

    const runSrc = {
      components: this.state.runSrc.components,
      template: {
        title: this.state.runSrc.template.title,
        styles: {
          background: background,
          title: title,
          subtitle: subtitle,
          button: button
        }
      }
    };
    this.setState({
      ...this.state,
      runSrc
    });
  };

  getTemplateProperties() {
    const styles = this.state.runSrc.template.styles;

    return (
      <div className="container-content">
        <div className="row">
          <a
            href="#default"
            onClick={e => this.goToTemplates(e, "template_selector")}
          >
            Choose Templates
          </a>
        </div>
        <div className="row">
          <div className="col-6 col-center">Background</div>
          <div className="col-6">
            <input
              type="color"
              name="background.backgroundColor"
              defaultValue={styles.background.backgroundColor}
              onChange={e => {
                this.handleTemplateChange(e);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-center">Background Image</div>
          <div className="col-6">
            <div>
              <input
                type="file"
                onChange={e => this.fileUpload("setBackgroundImage", e)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-center">Font Family</div>
          <div className="col-6">
            <select
              className="inp"
              name="background.fontFamily"
              defaultValue={styles.background.fontFamily}
              onChange={e => {
                this.handleTemplateChange(e);
              }}
            >
              {this.state.fontFamilyValue.map((item, key) => (
                <option key={key} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-center">Font Color</div>
          <div className="col-6">
            <input
              type="color"
              name="background.color"
              defaultValue={styles.background.color}
              onChange={e => {
                this.handleTemplateChange(e);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-center">Size title</div>
          <div className="col-6">
            <select
              className="inp"
              name="title.fontSize"
              defaultValue={styles.background.fontSize}
              onChange={e => {
                this.handleTemplateChange(e);
              }}
            >
              {this.state.fontSizeValue.map((item, key) => (
                <option key={key} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-center">Size text</div>
          <div className="col-6">
            <select
              className="inp"
              name="background.fontSize"
              defaultValue={styles.background.fontSize}
              onChange={e => {
                this.handleTemplateChange(e);
              }}
            >
              {this.state.fontSizeValue.map((item, key) => (
                <option key={key} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-center">Button color</div>
          <div className="col-6">
            <input
              type="color"
              name="button.backgroundColor"
              defaultValue={styles.button.backgroundColor}
              onChange={e => {
                this.handleTemplateChange(e);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-center">Button text</div>
          <div className="col-6">
            <select
              className="inp"
              name="button.fontSize"
              defaultValue={styles.button.fontSize}
              onChange={e => {
                this.handleTemplateChange(e);
              }}
            >
              {this.state.fontSizeValue.map((item, key) => (
                <option key={key} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  getTemplateSelector = () => {
    //const scale = 0.45;//Math.min(160/280);
    const scale = 0.5;
    const stylePreview = {
      transform: `scale(${scale})`,
      transformOrigin: `top left`,
      overflow: `hidden`
    };
    return (
      <div className="container-content">
        <div className="template-wrapper">
          {this.state.websiteTemplates.map((item, key) => (
            <div
              className="item"
              key={key}
              onClick={e => this.handleSelectTemplate(e, key)}
            >
              <div className="preview-template-title">{item.title}</div>
              <div className="box">
                <div className="preview-template" style={stylePreview}>
                  {this.getPreviewTemplate(key)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  getPreviewTemplate(row) {
    if (Object.keys(this.state.runSrc).length === 0) return <div>Empty</div>;
    else {
      const styles = this.state.websiteTemplates[row].styles;
      //const styles = this.state.runSrc.template.styles;
      const showStyle = true;
      return (
        <div className="mod-run" style={styles.background}>
          {this.state.runSrc.components.map((item, key) => (
            <div key={key} className="mod-box">
              {this.getModuleComponent({
                moduleItem: item, 
                properties: false,
                showStyle: showStyle,
                styles: styles})}
            </div>
          ))}
        </div>
      );
    }
  }

  getTemplates() {
    if (this.state.templateChange === "template_properties") {
      return this.getTemplateProperties();
    }
    if (this.state.templateChange === "template_selector") {
      return this.getTemplateSelector();
    }
  }

  goToTemplates = (event, templateChange) => {
    event.preventDefault();
    this.setState({ templateChange });
  };

  //
  // PREVIEW
  //

  getPreview() {
    if (Object.keys(this.state.runSrc).length === 0) return <div>Empty</div>;
    else {
      const styles = this.state.runSrc.template.styles;
      const showStyle = true;
      return (
        <div className="mod-run" style={styles.background}>
          {this.state.runSrc.components.map((item, key) => (
            <div key={key} className="mod-box">
              {this.getModuleComponent({
                moduleItem: item, 
                properties: false,
                showStyle: showStyle})}
            </div>
          ))}
        </div>
      );
    }
  }

  //
  // File upload
  //

  fileUpload = (functionCallBack, event) => {
    const selectedFile = event.target.files[0];
    const userId = sessionStorage.getItem("userId");
    if (selectedFile !== null) {
      if (userId !== null) {
        const fd = new FormData();

        fd.append("image", selectedFile, selectedFile.name);
        fd.append("user", userId);
        const paramsData = fd;

        axios
          .post("https://modules.weband.tv/upload/upload.php", paramsData)
          .then(res => {
            if (res.data.filename_server) {
              switch (functionCallBack) {
                case "setBackgroundImage":
                  this.setBackgroundImage(res.data.filename_server);
                  break;
                default:
                  return null;
              }
            }
          })
          .catch(error => {});
      } else {
        console.log("Please login session");
      }
    } else {
      console.log("have not image");
    }
  };

  setBackgroundImage(filename_server) {
    let toModify = ["background", "backgroundImage"];
    const styles = commons.copyObj(this.state.runSrc.template.styles);
    let background = styles.background;
    if (toModify[0] === "background") {
      background[toModify[1]] = this.converterValue(
        toModify[1],
        `url(${filename_server})`
      );
    }
    const runSrc = {
      components: this.state.runSrc.components,
      template: {
        title: this.state.runSrc.template.title,
        styles: {
          background: background,
          title: styles.title,
          subtitle: styles.subtitle,
          button: styles.button
        }
      }
    };
    this.setState({
      ...this.state,
      runSrc
    });
  }

  setModuleImage(filename_server) {
    console.log("____________ setModuleImage", filename_server);
  }

  //
  // RENDER
  //

  render() {
    //console.log("RunSrc: ", this.state.runSrc);
    return (
      <div className="tertiary-style">
        <div className="container padding-lr">
          <div className="container-header">
            <div className="col-6">
              <h2>Website Editor</h2>
            </div>
            <div className="col-6 inline">
              <div className="website-url-wrapper">
                {this.state.runSrcSaved ? (
                  <div className="tooltip-wrapper">
                    <div className="tooltip">Successfully saved!</div>
                  </div>
                ) : null}
                <input
                  type="text"
                  className="website-url inp"
                  defaultValue={`https://modules.weband.tv/pro/${
                    this.state.websiteId
                  }`}
                />
              </div>
              <button
                onClick={this.handleSaveChanges}
                className="btn btn-primary"
              >
                <i className="icon-save space" /> Save Changes
              </button>
            </div>
          </div>
          <div>
            <div className="editor-wrapper">
              <div className="col-3">
                <div className="box-wrapper">
                  <div className="box-header">Modules</div>
                  <div className="box-container">
                    <div className="modules-list">
                      {this.state.modulesList.map((moduleItem, key) => (
                        <div key={key}>
                          <div className="modules-list-header">
                            {moduleItem.moduleTitle}
                          </div>
                          <div
                            className="module-box"
                            onDragStart={e =>
                              this.onDragStart(e, moduleItem.moduleKey)
                            }
                            draggable
                          >
                            <div className="no-click-event" />
                            <div>
                              {this.getModuleComponent({
                                moduleItem: moduleItem, 
                                properties: false,
                                showStyle: false})}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="box-wrapper">
                  <div className="box-header">Editor</div>
                  <div className="box-container">
                    {this.createWebsiteDraggable()}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="box-wrapper">
                  <div className="box-header">Templates</div>
                  <div className="box-container">{this.getTemplates()}</div>
                </div>
              </div>
              <div className="col-3">
                <div className="box-wrapper">
                  <div className="box-header">Preview</div>
                  <div className="box-container">{this.getPreview()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer className="footer" />
        {this.state.modalVisibility ? (
          <Modal
            {...this.props}
            title={
              this.state.websiteDraggable[
                this.state.websiteDraggableConfig.itemSelected
              ].moduleTitle
            }
            closeModal={this.closeModal}
          >
            {this.showModuleProperties()}
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default WebsiteEdit;
