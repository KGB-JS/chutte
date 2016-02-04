import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
  handleSignout(e){
     e.preventDefault();
     this.props.submitSignout();
   }

  render() {
    let signout = this.props.user.token !== '' ? <li onClick={this.handleSignout.bind(this)}><a>Sign out</a></li> : '';
    let icon = (<span><img className="logo" src="../assets/teampic/peter.jpg"  alt="Chutte Logo" height="50" width="50" /></span>);
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
              {signout}
            </ul>
        </div>
      </nav>
    );
  }
}
