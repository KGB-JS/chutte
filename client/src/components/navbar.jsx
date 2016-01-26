import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
  render() {
    var icon = (
    <span>
      <a href="/" >
        <img className="logo" src="../assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" /> </a>
    </span>
  )
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid chutteGreen">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">{icon} Chutte</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
              <li><Link to="/browse"><span className="glyphicon glyphicon-shopping-cart">Browse</span></Link></li>
              <li><Link to="/dashboard"><span className="glyphicon glyphicon-user">Dashboard</span></Link></li>
            </ul>
        </div>
      </nav>
    );
  }
}
