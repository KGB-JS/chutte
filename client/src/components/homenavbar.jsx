import React from 'react';
import {Link} from 'react-router';
import SignUpModal from './../components/signupModal';
import SignInModal from './../components/loginModal';

export default class HomeNavbar extends React.Component {
  handleSignout(e){
     e.preventDefault();
     this.props.submitSignout();
   }

  render() {
    let icon = (
    <span>
        <img className="logo" src="../assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" />
    </span>)

    if(this.props.user.token === ''){
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link  to="/" className="navbar-brand">{icon} Chutte</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><SignUpModal/></li>
              <li><SignInModal/></li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link  to="/" className="navbar-brand">{icon} Chutte</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li onClick={this.handleSignout.bind(this)}>Sign out</li>
            </ul>
          </div>
        </nav>
      );
    }
  }
};
