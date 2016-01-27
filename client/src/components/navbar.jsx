import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
  render() {
 
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid chutteGreen">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Chutte</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
              <li><Link to="/browse"><span className="glyphicon glyphicon-shopping-cart"></span> Browse</Link></li>
              <li><Link to="/dashboard"><span className="glyphicon glyphicon-user"></span> Dashboard</Link></li>
            </ul>
        </div>
      </nav>
    );
  }
}
