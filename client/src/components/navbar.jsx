import React from 'react';
import {Link} from 'react-router';
import SignUpModal from './../components/signupModal';
import SignInModal from './../components/loginModal';

export default class Navbar extends React.Component {
  handleSignout(e){
     e.preventDefault();
     this.props.submitSignout();
   }

  render() {
    let icon = (<span><img className="logo" src="../assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" /></span>);

    if(this.props.user.token !== ''){
      return (
        <nav className="navbar navbar-default navBrowse">
          <div className="container-fluid chutteGreen">
            <div className="navbar-header">
              <div className="navbar-header">
                <Link  to="/" className="navbar-brand">{icon} Chutte</Link>
              </div>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/browse"><span className="glyphicon glyphicon-shopping-cart"></span> Browse</Link></li>
              <li><Link to="/dashboard/profile"><span className="glyphicon glyphicon-user"></span> Dashboard</Link></li>
              <li><a onClick={this.handleSignout.bind(this)}>Sign out</a></li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-default navBrowse">
          <div className="container-fluid chutteGreen">
            <div className="navbar-header">
              <div className="navbar-header">
                <Link  to="/" className="navbar-brand">{icon} Chutte</Link>
              </div>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><SignUpModal/></li>
              <li><SignInModal/></li>
            </ul>
          </div>
        </nav>
      )
    }
  }
}
