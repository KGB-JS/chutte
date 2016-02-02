import React from 'react';

class UserProfile extends React.Component {
	constructor(props){
		super(props);
		this.state({
			username	: {this.props.userDetail.username},
			firstname	: {this.props.userDetail.firstname},
	    lastname  : {this.props.userDetail.lastname},
			phone	: {this.props.userDetail.phone},
			streetAddress	: {this.props.userDetail.streetAddress},
			country: {this.props.userDetail.country},
			stateRegion: {this.props.userDetail.stateRegion},
			city: {this.props.userDetail.city}
		});
	}

	render() {
		return (
		<div className="userProfile" id={this.props.userDetail._id}>
		  <input className="userProfile" value={this.state.username}>User Name:{this.props.username}</input>
		  <input className="userProfile" value={this.state.firstname}>First Name:{this.props.firstname}</input>
		  <input className="userProfile" value={this.state.lastname}>Last Name:{this.state.lastname}</input>
		  <input className="userProfile" value={this.state.phone}>Phone:{this.state.phone}</input>
		  <input className="userProfile" value={this.state.streetAddress}>Street Address:{this.state.streetAddress}</input>
		  <input className="userProfile" value={this.state.country}>Country:{this.state.country}</input>
		  <input className="userProfile" value={this.state.stateRegion}>State:{this.state.stateRegion}</input>
		  <input className="userProfile" value={this.state.city}>City:{this.state.city}</div>
		</div>
		)
	}
};

export default UserProfile;



