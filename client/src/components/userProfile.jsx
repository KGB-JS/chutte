import React from 'react';
// import {connect} from 'react-redux';
// import DefaultNavbar from '../components/navbar';
// import ProfileSideNavBar from './../components/profileSideBar';
// import {userLogout} from './../actions/actionsUserAuth';
// import {postUpdateProfile} from './../actions/actionsUserSignup';

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.userDetail.userName,
      firstname: this.props.userDetail.firstName,
      lastname: this.props.userDetail.lastname,
      phone: this.props.userDetail.phone,
      streetAddress: this.props.userDetail.address,
      stateRegion: this.props.userDetail.stateRegion,
      city: this.props.userDetail.city,
      validation: true,
      password: '',
      confirmPassword: ''
    };
  }

  validatePassword(event){
    this.setState({password: event.target.value });
  }

  checkPassword(event){
    this.setState({ confirmPassword: event.target.value });
    if(this.state.password === event.target.value){
      this.setState({ validation: false });
    } else {
      this.setState({ validation: true });
    }
  }

  submitProfileUpdate(event){

  event.preventDefault();
   var userUpdate = {
      userName: this.props.userDetail.userName,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      phone: this.refs.phone.value,
      address: this.refs.address.value,
      state: this.refs.state.value,
      city: this.refs.city.value,
      zip: this.refs.zip.value,
      password: this.state.password
    };
    for(var key in userUpdate){
      if(userUpdate[key] === ""){
        userUpdate[key] = this.props.userDetail[key];
      }
    }
    this.props.updateProfile(userUpdate, this.props.userDetail.token);
  }

  render() {
    return (
        <div className = "bumpDown col-sm-offset-3 col-md-offset-2 col-md-offset-2 col-md-10">
         <form>
           <div className = "col-md-6">
              <div className="form-group">
                <label htmlFor="inputFirstName">First Name</label>
                <input id="inputFirstName" ref="firstName" type="text" className="form-control" placeholder={this.props.userDetail.firstName}/>
              </div>
              <div className="form-group">
                <label htmlFor="inputLastName">Last Name</label>
                <input id="inputLastName" ref="lastName" type="text" className="form-control" placeholder={this.props.userDetail.lastName}/>
              </div>
              <div className="form-group">
                <label htmlFor="inputPhone">Phone</label>
                <input id="inputPhone" ref="phone" type="text" className="form-control" placeholder={this.props.userDetail.phone}/>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Street Address</label>
                <input id="inputAddress" ref="address" type="text" className="form-control" placeholder={this.props.userDetail.address}/>
              </div>
              <div className="form-group">
                <label htmlFor="inputCity">City</label>
                <input id="inputCity" ref="city" type="text" className="form-control" placeholder={this.props.userDetail.city}/>
              </div>
              <div className="form-group">
                <label htmlFor="inputState">State Region</label>
                <input id="inputState" ref="state" type="text" className="form-control" placeholder={this.props.userDetail.state}/>
              </div>
              <div className="form-group">
                <label htmlFor="inputZip">Zip</label>
                <input id="inputZip" ref="zip" type="text" className="form-control" placeholder={this.props.userDetail.zip}/>
              </div>
            </div>

            <div className = "col-md-5">
              <div className="form-group">
                <label htmlFor="inputEmail">Username</label>
                <input ref="userName" type="email" className="form-control" id="inputEmail" placeholder={this.props.userDetail.userName}/>
              </div>
              <div className="form-group">
                <label htmlFor="password1">Password</label>
                <input type="password" className="form-control" id="password1" value={this.state.password} onChange={this.validatePassword.bind(this)} placeholder="Password"/>
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" className="form-control" id="password2" value={this.state.confirmPassword} onChange={this.checkPassword.bind(this)} placeholder="Confirm Password"/>
              </div>
               <button type="submit" className="btn btn-default" onClick={this.submitProfileUpdate.bind(this)} disabled={this.state.validation}>Submit</button>
            </div>
          </form>
        </div>
    )
  }
};

// function mapDispatchToProps(dispatch){
//   return {
//     updateProfile: function(user, token){
//       dispatch(postUpdateProfile(user, token))
//     }
//   }
// }
//
// function mapStateToProps(state){
//   return {
//     userDetail: state.userStore.userAuth
//   };
// }

export default UserProfile;
