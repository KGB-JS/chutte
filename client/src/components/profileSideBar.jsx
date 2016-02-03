import React from 'react';
import {Link} from 'react-router';
import {UserOptions} from './../actions/actionConstants';

export default class ProfileSideNavbar extends React.Component {
  render() {
    var userOptions = ["User Profile", "Create Listing", "Current Listing"];

    return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
            <ul className="sidebar-font">
              <li id={userOptions[0]}><Link to="dashboard/profile">{userOptions[0]}</Link></li>
              <li id={userOptions[1]}><Link to='dashboard/create'>{userOptions[1]}</Link></li>
              <li id={userOptions[2]}><Link to='dashboard/current'>{userOptions[2]}</Link></li>
            </ul>
          </div>
        </div>
    );
  }
};
