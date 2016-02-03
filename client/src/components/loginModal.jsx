import React from 'react';
import {Popover, Tooltip, OverlayTrigger, Button, Modal} from 'react-bootstrap';
import UserSignIn from './userAuth';

class SignInModal extends React.Component {
  constructor(props){
    super(props);
    this.state = { showModal: false };
  }

  close(){
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true });
  }

  render() {
    let popover = <Popover title="popover">PopOver</Popover>
    let tooltip = <Tooltip id="wow">wow</Tooltip>;

    return (
      <div>
        <Button bsStyle="primary"
          bsSize="large"
          onClick={this.open.bind(this)}>
          Sign In
        </Button>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserSignIn/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default SignInModal;
