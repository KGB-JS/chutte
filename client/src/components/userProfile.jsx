import React from 'react';

class UserProfile extends React.component {
	render: function() {
		return (
			<div className="userProfile" id={this.props.userDetail._id}>
			  <div className="userName">User Name:{this.props.userDetail.username}</div>
			  <div className="firstName">User Name:{this.props.userDetail.firstname}</div>
			  <div className="lastName">User Name:{this.props.userDetail.lastname}</div>
			  <div className="firstName">User Name:{this.props.userDetail.firstname}</div>
			</div>
			)
	}
};

export default UserProfile;