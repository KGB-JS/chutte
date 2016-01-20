import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Chutte</a>
            <ul className="nav nav-pills">
              <li role="presentation"><a href="#">Sign Up</a></li>
              <li role="presentation"><a href="#">Login In</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
