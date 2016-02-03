import React from 'react';
import {connect} from 'react-redux';
import {authenticateUser} from './../actions/actionsUserAuth';
import HomeNavBar from './homenavbar';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

class UserAuth extends React.Component{
  constructor(props){
    super(props);
    this.state = {userEmail: '' , inactiveButton: true };
  }

  submitUserLogin(e){
    e.preventDefault();
    let user = {
      username: this.state.userEmail,
      password: this.refs.password.value
    };

    this.props.signInUser(user);
    this.props.history.push('browse');
  }

  checkUserName(event){
    this.setState({userEmail: event.target.value});
    var isValidEmail = event.target.value.includes('@');
    var isValidPassword = this.refs.password.value;

    if(isValidEmail && isValidPassword.length > 5){
      this.setState({inactiveButton: false });
    } else {
      this.setState({inactiveButton: true });
    }
  }

  checkValidation(){
    var isValidEmail = this.state.userEmail.includes('@');
    var isValidPassword = this.refs.password.value;

    if(isValidEmail && isValidPassword.length > 5){
      this.setState({inactiveButton: false });
    } else {
      this.setState({inactiveButton: true });
    }
  }



  render(){
    return (
      <div>
        <div className="container-fluid">
        <div className="col-md-7 col-md-offset-2">
          <Form>
            <div className="row">
              <span><i className="fa fa-envelope-o fa-fw"></i></span>
              <ValidatedInput
                value={ this.state.userEmail }
                onChange={this.checkUserName.bind(this)}
                name="checkemail"
                type="email" 
                validate='required,isEmail'
                errorHelp={{
                required: 'Please enter your email',
                isEmail: 'Email is invalid'
                }}
                className="form-control" placeholder='Email'/>
            </div>
            <div className="row">
              <span><i className="fa fa-key fa-fw"></i></span>
              <input 
              onChange={this.checkValidation.bind(this)}
              className="form-control" ref="password" type="password" placeholder="Password" />
            </div>
            <div className="row">
              <button className="btn btn-primary" onClick={this.submitUserLogin.bind(this)} disabled={this.state.inactiveButton}>Sign In</button>
            </div>
          </Form>
          </div>
        </div>
      </div>
    )
  }
};

function mapDispatchToProps(dispatch){
  return {
    signInUser: function(user) {
      dispatch(authenticateUser(user));
    }
  }
}

function mapStateToProps(state){
  return {
    user: state.userStore.userAuth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);
