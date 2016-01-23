import React from 'react';
import {Link} from 'react-router';

export default class ProfileSideNavbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Create Listing</a></li>
              <li><a href="#">Current Listings</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
