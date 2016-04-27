import React from 'react';
import {bsStyle, hasFeedback, Input } from 'react-bootstrap';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

export default class UserSignup extends React.Component {
  constructor(props){
    super(props);
    this.state = { password: '', checkpassword: '', username: '', validation: true };
  }

  updatePassword(event){
    this.setState({password: event.target.value });
  }

  updateUserName(event){
    this.setState({username: event.target.value });
  }

  validatePassword(event){
    this.setState({ checkpassword: event.target.value });
    if(this.state.password === event.target.value){
      this.setState({ validation: false });
    } else {
      this.setState({ validation: true });
    }
  }

  submitSignUp(e){
    e.preventDefault();
    var newUser = {
      username: String(this.state.username),
      password: String(this.state.password),
    };

    this.props.signupUser(newUser);
  }

  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
            <Form role="form">
             <div className="col-md-12">
              <div className="form-group">
                  <ValidatedInput
                  value={this.state.username }
                  onChange={this.updateUserName.bind(this)}
                  name="checkemail"
                  label="Email"
                  type="text"
                  validate='required,isEmail'
                  errorHelp={{
                  required: 'Please enter your email',
                  isEmail: 'Email is invalid'
                  }}
                  className="form-control" placeholder='Email'/>
              </div>
              <div className="form-group">
                  <ValidatedInput
                  value={this.state.password }
                  onChange={this.updatePassword.bind(this)}
                  name="password"
                  type="password"
                  label="Enter Password"
                  validate='required,isLength:6:60'
                  errorHelp={{
                    required: 'Please specify a password',
                    isLength: 'Password must be at least 6 characters'
                  }}
                  className="form-control" placeholder='Enter Password'/>
              </div>
                <div className="form-group">
                  <ValidatedInput
                  value={this.state.checkpassword }
                  onChange={this.validatePassword.bind(this)}
                  name="confirmPassword"
                  label='Confirm Password'
                  validate={(val, context) => val === context.password }

                  errorHelp='Passwords do not match'
                  type="password"
                  ref="passwordConfirm" className="form-control" placeholder='Re-enter Password' />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-lg" onClick={this.submitSignUp.bind(this)} disabled={this.state.validation}>Submit</button>
                </div>
              </div>
              </Form>
            </div>
          </div>
        </div>
    )
   }
 }

 export default UserSignup;
