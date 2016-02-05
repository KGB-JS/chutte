import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../components/navbar';
import ProfileSideNavBar from './../components/profileSideBar';
import {userLogout} from './../actions/actionsUserAuth';
import {postUpdateProfile} from './../actions/actionsUserSignup';

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
    console.log(userUpdate, "this is the user update profile");
    this.props.updateProfile(userUpdate, this.props.userDetail.token);
  }

  render() {
    return (
      <div>
        <NavBar submitSignout={this.props.submitSignout}
           user={this.props.userDetail} />
           <div className = "col-md-2">
        <ProfileSideNavBar/>
        </div>
        <div className = "bumpDown col-md-offset-2 col-md-10">        
         <form>
           <div className = "col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">First Name</label>
                <input ref="firstName" type="text" className="form-control" placeholder={this.props.userDetail.firstName}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Last Name</label>
                <input ref="lastName" type="text" className="form-control" placeholder={this.props.userDetail.lastName}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Phone</label>
                <input ref="phone" type="text" className="form-control" placeholder={this.props.userDetail.phone}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Street Address</label>
                <input ref="address" type="text" className="form-control" placeholder={this.props.userDetail.address}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">State Region</label>
                <input ref="state" type="text" className="form-control" placeholder={this.props.userDetail.state}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">City</label>
                <input ref="city" type="text" className="form-control" placeholder={this.props.userDetail.city}/>
              </div>           
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Zip</label>
                <input ref="zip" type="text" className="form-control" placeholder={this.props.userDetail.zip}/>
              </div>
            </div>

            <div className = "col-md-5">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input ref="userName" type="email" className="form-control" id="exampleInputEmail1" placeholder={this.props.userDetail.userName}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={this.state.password} onChange={this.validatePassword.bind(this)} placeholder="Password"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword2">Confirm Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" value={this.state.confirmPassword} onChange={this.checkPassword.bind(this)} placeholder="Confirm Password"/>
              </div>
               <button type="submit" className="btn btn-default" onClick={this.submitProfileUpdate.bind(this)} disabled={this.state.validation}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

function mapDispatchToProps(dispatch){
  return {
    submitSignout: function(){
       dispatch(userLogout());
    },
    updateProfile: function(user, token){
      dispatch(postUpdateProfile(user, token))
    }
  }
}

function mapStateToProps(state){
  return {
    userDetail: state.userStore.userAuth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
