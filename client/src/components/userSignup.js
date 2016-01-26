import React from 'react';
import {createListing, postListing} from './../actions/actionsCreateListing';


export default class UserSignup extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  submitSignUp(){
    var signupDetails = {
      firstname : String(this.state.categorySelected),
      lastname : String(this.refs.quantity.value),
      phone : Number(this.resf.phone.value),
      address: String(this.refs.address.value),
      country: String(this.refs.phone.value),
      zip: Number(this.refs.zip.value),
      state: String(this.refs.state.value),
      city: String(this.refs.city.value),
      username: String(this.refs.username.value),
      password : String(this.refs.name.value)
    };
    console.log(signupDetails);
    this.props.submitListing(itemDetails);
  }

  render() {
    var userAttributes = ["firstname", "lastname", "phone", "address", "country",
    "zip", "state", "city", "username", "password"];

    return (
      <div className="form col-md-3 userinput">
       {userAttributes.map(function(attribute, index) {
          return (
              <div>
                <label>{attribute}</label>
                <input key={index} ref={attribute}/>
              </div>
          )
        })}
      </div>
    )
  }
}

export default UserSignup;
