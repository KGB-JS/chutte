import React from 'react';
import {connect} from 'react-redux';
import {postUserSignup} from './../actions/actionsUserSignup';
import HomeNavBar from './homenavbar';

export default class UserSignup extends React.Component {
  constructor(props){
    super(props);
  }

  submitSignUp(e){
    e.preventDefault();
    var newUser = {
      firstName : String(this.refs.firstName.value),
      lastName : String(this.refs.lastName.value),
      phone : Number(this.refs.phoneNumber.value),
      address: String(this.refs.address.value),
      country: String(this.refs.country.value),
      state: String(this.refs.state.value),
      city: String(this.refs.city.value),
      zip: Number(this.refs.zip.value),
      username: String(this.refs.username.value),
      password : String(this.refs.password.value)
    };
    this.props.signupUser(newUser);
    this.props.history.push('browse');
  }

  render() {
    return (
      <div>
      <HomeNavBar/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
            <form role="form">
             <div className="col-md-3">
              <div className="form-group">
                  <label>Email</label>
                  <input type="text" ref="username" className="form-control" placeholder='Email'/>
                </div>
                <div className="form-group">
                  <label>Enter Password</label>
                  <input type="password" ref="password" className="form-control" placeholder='Enter Password'/>
                </div>
                <div className="form-group">
                  <label>Re-enter Password</label>
                  <input type="password" ref="passwordConfirm" className="form-control" placeholder='Re-enter Password' />
                </div>

                
              
              </div>
              <div className="col-md-3">
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
              <div className="col-md-3">
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
                  <button className="btn btn-primary btn-lg" onClick={this.submitSignUp.bind(this)}>Submit</button>
                </div>

                
              </div>
              </form>
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
