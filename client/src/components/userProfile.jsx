import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../components/navbar';
import ProfileSideNavBar from './../components/profileSideBar';
import {userLogout} from './../actions/actionsUserAuth';

class UserProfile extends React.Component {
	constructor(props){
		super(props);
		this.state({
			username	: {this.props.userDetail.username},
			firstname	: {this.props.userDetail.firstname},
	    lastname  : {this.props.userDetail.lastname},
			phone	: {this.props.userDetail.phone},
			streetAddress	: {this.props.userDetail.streetAddress},
			stateRegion: {this.props.userDetail.stateRegion},
			city: {this.props.userDetail.city}
		});
	}

	render() {
		return (
			<div>
				<NavBar submitSignout={this.props.submitSignout}
           user={this.props.userAuth} />
        <ProfileSideNavBar/>
				<div className="userProfile" id={this.props.userDetail._id}>
					<input className="userProfile" type="text" value={this.props.userDetail.username}/>
					<input className="userProfile" type="text" value={this.props.userDetail.firstname}/>
					<input className="userProfile" type="text" value={this.props.userDetail.lastname}/>
					<input className="userProfile" type="text" value={this.props.userDetail.phone}/>
					<input className="userProfile" type="text" value={this.props.userDetail.streetAddress}/>
					<input className="userProfile" type="text" value={this.props.userDetail.stateRegion}/>
					<input className="userProfile" type="text" value={this.props.userDetail.city}/>
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
