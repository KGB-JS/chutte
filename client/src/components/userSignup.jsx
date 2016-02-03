import React from 'react';
import {connect} from 'react-redux';
import {bsStyle, hasFeedback, Input } from 'react-bootstrap';
import {postUserSignup} from './../actions/actionsUserSignup';
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
      firstName: String(this.refs.firstName.value),
      lastName: String(this.refs.lastName.value),
      phone: Number(this.refs.phoneNumber.value),
      address: String(this.refs.address.value),
      state: String(this.refs.state.value),
      city: String(this.refs.city.value),
      zip: Number(this.refs.zip.value)
    };
    this.props.signupUser(newUser);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
            <Form role="form">
             <div className="col-md-4">
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
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" ref="firstName" className="form-control" placeholder='First Name'/>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" ref="lastName" className="form-control" placeholder='Last Name'/>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" ref="phoneNumber" className="form-control" placeholder='Phone Number'/>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" ref="address" className="form-control" placeholder='Address'/>
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input type="text" ref="city" className="form-control" placeholder='City'/>
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" ref="state" className="form-control" placeholder='State'/>
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input type="text" ref="zip" className="form-control" placeholder='Zip Code'/>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-lg" onClick={this.submitSignUp.bind(this)} disabled={this.state.validation}>Submit</button>
                </div>
              </div>

              </Form>
            </div>
          </div>
        </div>
      </div>
    )
   }
 }

 function mapDispatchToProps(dispatch){
   return {
     signupUser: function(user) {
       dispatch(postUserSignup(user));
     }
   }
 }

 function mapStateToProps(state){
   return {
     user: state.userStore.userAuth
   }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
