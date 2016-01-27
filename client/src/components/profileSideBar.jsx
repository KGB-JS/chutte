import React from 'react';
import {Link} from 'react-router';

export default class ProfileSideNavbar extends React.Component {
  render() {
    return (
      <div className="col-sm-3 col-md-2 sideBar profileBar">
          <ul className="nav nav-sidebar browse">
            <li><a href="#">Create Listing</a></li>
            <li><a href="#">Current Listings</a></li>
          </ul>
      </div>
    );
  }
};
