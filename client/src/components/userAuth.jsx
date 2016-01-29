import React from 'react';
import {connect} from 'react-redux';
import {authenticateUser} from '../actions/actionsUserLogin';
import HomeNavBar from './homenavbar';

class UserAuth extends React.Component{
  submitUserLogin(e){
    e.preventDefault();
    let user = {
      userName: this.refs.userName.value,
      password: this.refs.password.value
    }
    this.props.signInUser(user);
    this.props.history.push('browse');
  }

  render(){
    return (
      <div>
      <HomeNavBar/>
        <div className="container-fluid">
        <div className="col-md-7 col-md-offset-2">
          <form>
            <div className="row">
              <span><i className="fa fa-envelope-o fa-fw"></i></span>
              <input className="form-control" ref="userName" type="email" placeholder="Email" />
            </div>
            <div className="row">
              <span><i className="fa fa-key fa-fw"></i></span>
              <input className="form-control" ref="password" type="password" placeholder="Password" />
            </div>
            <div className="row">
              <button className="btn btn-primary" onClick={this.submitUserLogin.bind(this)}>Sign In</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    )
  }
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
    user: state.userStore.userAuth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);
