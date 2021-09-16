import React from 'react';
import { Button } from 'reactstrap';
import Modal from "react-bootstrap/Modal";
import ForgotPassword from "../common/ForgotPassword";
import OperationList from "../common/OperationList";
import ConfigureOperation from "../common/ConfigureOperation";
import Profiile from "../common/Profile";

class Popup extends React.Component {

  callback = (list) => {
    this.props.parentCloseCallback(list);
  }

  renderPopupBody() {  
    switch(this.props.popupConfig.type) {
      case 'forgotPassword':
        return <ForgotPassword popupClose={this.props.parentCloseCallback}></ForgotPassword>;
      case 'toolsList':
        return <ConfigureOperation showTools={true} popupClose={this.callback}></ConfigureOperation>;
      case 'workerList':
        return <ConfigureOperation showWorkers={true} popupClose={this.callback}></ConfigureOperation>;
      case 'configureOperation':
        return <ConfigureOperation showTools={true} showWorkers={true} popupClose={this.callback}></ConfigureOperation>;
      case 'operationList':
        return <OperationList popupClose={this.callback}></OperationList>;
      case 'image':
        return <img src={this.props.popupConfig.body} className='img-thumbnail' alt='...'></img> ;
      case 'profile':
          return <Profiile></Profiile> ;
        default:
        return this.props.popupConfig.body;
    }
  };

  render() {
    const popupConfigType = this.props.popupConfig.type;
    let button;
    if (popupConfigType === "confirmation") {
      button = <Button color="success" onClick={this.props.parentConfirmCallback}>Confirm Delete</Button>;
    } 
    return (
      <Modal show={this.props.openFlag} onHide={this.props.parentCloseCallback}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.popupConfig.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { this.renderPopupBody() }
        </Modal.Body>
        <Modal.Footer>
          {button}
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Popup;