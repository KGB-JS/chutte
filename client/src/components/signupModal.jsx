import React from 'react';
import {Modal} from 'react-bootstrap';
import UserSignup from './userSignup';

class SignUpModal extends React.Component {
  constructor(props){
    super(props);
    this.state = { showModal: false };
  }

  close(){
    this.setState({ showModal: false });
  }

  open(e){
    e.preventDefault;
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <a href='#' onClick={this.open.bind(this)}>Signup</a>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserSignup/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default SignUpModal;
