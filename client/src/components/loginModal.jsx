import React from 'react';
import {Modal} from 'react-bootstrap';
import UserSignIn from './userAuth';

class SignInModal extends React.Component {
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
        <a href="#" onClick={this.open.bind(this)}>Sign In</a>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserSignIn signInUser={this.props.signInUser}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default SignInModal;
