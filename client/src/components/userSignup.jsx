import React from 'react';
import {createListing, postListing} from './../actions/actionsCreateListing';


export default class UserSignup extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  submitSignUp(){
    var signupDetails = {
      firstName : String(this.state.categorySelected),
      lastName : String(this.refs.quantity.value),
      phone : Number(this.resf.phone.value),
      address: String(this.refs.address.value),
      country: String(this.refs.phone.value),
      state: String(this.refs.state.value),
      city: String(this.refs.city.value),
      zip: Number(this.refs.zip.value),
      username: String(this.refs.username.value),
      password : String(this.refs.name.value)
    };
    console.log(signupDetails);
    this.props.submitListing(itemDetails);
  }

  render() {
    return (
      <div className="form col-md-3 userinput">
        <form>
        <label>First Name</label>
        <input type="text" ref="firstName" className="form-group col-md-2" placeholder='First Name'>
        <label type="text" ref="lastName" className="form-group col-md-2">Last Name</label>
        <input type="text" ref="firstName" className="form-group col-md-2" placeholder='Last Name'>
        <label>Phone Number</label>
        <input type="text" ref="phoneNumber" className="form-group col-md-2" placeholder='Phone Number'>
        <label>Address</label>
        <input type="text" ref="address" className="form-group col-md-2" placeholder='Address'>
        <label>State</label>
        <input type="text" ref="state" className="form-group col-md-2" placeholder='State'>
        <label>City</label>
        <input type="text" ref="city" className="form-group col-md-2" placeholder='City'>
        <label>Zip Code</label>
        <input type="text" ref="zip" className="form-group col-md-2" placeholder='Zip Code'>
        <label>Country</label>
        <input type="text" ref="country" className="form-group col-md-2" placeholder='Country'>
        <label>Email/Username</label>
        <input type="text" ref="username" className="form-group col-md-2" placeholder='Email/Username'>
        <label>Enter Password</label>
        <input type="text" ref="password" className="form-group col-md-2" placeholder='Enter Password'>
        <label>Re-enter Password</label>
        <input type="text" ref="passwordConfirm" className="form-group col-md-2" placeholder='Re-enter Password'>
        <button onClick={this.submitForm.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default UserSignup;
