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
        <button className="btn btn-signUp" onClick={this.open.bind(this)}>Sign Up</button>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserSignup signupUser={this.props.signupUser}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default SignUpModal;
