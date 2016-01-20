import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Chutte</a>
            <ul class="nav nav-pills">
              <li role="presentation"><a href="#">Sign Up</a></li>
              <li role="presentation"><a href="#">Login In</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
