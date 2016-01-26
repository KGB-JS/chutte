import React from 'react';
import {connect} from 'react-redux';
import {authenticateUser} from '../actions/actionsUserLogin';

class UserAuth extends React.Component{
  submitUserLogin(e){
    e.preventDefault();
    let user = {
      userName: this.refs.userName.value,
      password: this.refs.password.value
    }
    this.props.signInUser(user);
  }

  render(){
    return (
      <div className="container-fluid">
        <form onSubmit={this.submitUserLogin.bind(this)}>
          <div className="row">
            <span><i className="fa fa-envelope-o fa-fw"></i></span>
            <input className="form-control" ref="userName" type="email" placeholder="Email" />
          </div>
          <div className="row">
            <span><i className="fa fa-key fa-fw"></i></span>
            <input className="form-control" ref="password" type="password" placeholder="Password" />
          </div>
          <div className="row">
            <button className="btn btn-primary" type="submit">Sign In</button>
          </div>
        </form>
      </div>
    )
  }
};

UserAuth.contextTypes = {
  router: React.PropTypes.func
};

function mapDispatchToProps(dispatch){
  return {
    signInUser: function(user) {
      dispatch(authenticateUser(user));
    }
  }
}

function mapStateToProps(state){
  return {
    user: state.userStore.userLogin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);
