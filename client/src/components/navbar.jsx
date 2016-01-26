import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid chutteGreen">
          <div className="navbar-header">
            <Link className="navbar-brand chutteSymbol" to="/">Chutte</Link>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/browse"><span className="glyphicon glyphicon-shopping-cart">Browse</span></Link></li>
              <li><Link to="/dashboard"><span className="glyphicon glyphicon-user">Dashboard</span></Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
