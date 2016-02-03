import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
  handleSignout(e){
     e.preventDefault();
     this.props.submitSignout();
   }

  render() {
    let signout = this.props.user.token !== '' ? <li onClick={this.handleSignout.bind(this)}>Sign out</li> : '';

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid chutteGreen">
          <div className="navbar-header">
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
