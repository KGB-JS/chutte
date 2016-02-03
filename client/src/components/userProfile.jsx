import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../components/navbar';
import ProfileSideNavBar from './../components/profileSideBar';
import {userLogout} from './../actions/actionsUserAuth';

class UserProfile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.userDetail.username,
			firstname: this.props.userDetail.firstname,
	    lastname: this.props.userDetail.lastname,
			phone: this.props.userDetail.phone,
			streetAddress: this.props.userDetail.streetAddress,
			stateRegion: this.props.userDetail.stateRegion,
			city: this.props.userDetail.city
		};
	}

	render() {
		return (
			<div>
				<NavBar submitSignout={this.props.submitSignout}
           user={this.props.userDetail} />
           <div className = "col-md-2">
        <ProfileSideNavBar/>
        </div>
				<div className = "col-md-offset-2 col-md-10">
                
               <form>
               <div className = "col-md-5">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder={this.props.userDetail.username}/>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">First Name</label>
                    <input type="text" className="form-control" placeholder={this.props.userDetail.firstname}/>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Last Name</label>
                    <input type="text" className="form-control" placeholder={this.props.userDetail.lastname}/>
                  </div>
                  
                 
                  </div>
                  <div className = "col-md-5">
                      <div className="form-group">
                        <label for="exampleInputPassword1">Phone</label>
                        <input type="text" className="form-control" placeholder={this.props.userDetail.phone}/>
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Street Address</label>
                        <input type="text" className="form-control" placeholder={this.props.userDetail.streetAddress}/>
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">State Region</label>
                        <input type="text" className="form-control" placeholder={this.props.userDetail.stateRegion}/>
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">City</label>
                        <input type="text" className="form-control" placeholder={this.props.userDetail.city}/>
                      </div>
                       <button type="submit" className="btn btn-default">Submit</button>
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
    }
  }
}

function mapStateToProps(state){
  return {
    userDetail: state.userStore.userAuth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
