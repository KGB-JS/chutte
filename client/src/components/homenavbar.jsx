import React from 'react';

export default class HomeNavbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Chutte</a>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Sign Up</a></li>
              <li><a href="#">Login In</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
