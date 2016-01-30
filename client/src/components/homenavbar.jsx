import React from 'react';
import {Link} from 'react-router';
import SignUpModal from './../components/signupModal';
import SignInModal from './../components/loginModal';

export default class HomeNavbar extends React.Component {
  render() {
    var icon = (
    <span>
        <img className="logo" src="../assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" />
    </span>
  )
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
  }
};
