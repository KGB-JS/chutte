import React from 'react';
import {Link} from 'react-router';
import {UserOptions} from './../actions/actionConstants';

export default class ProfileSideNavbar extends React.Component {
  render() {
    var userOptions = ["User Profile", "Create Listing", "Current Listing"];
    var icon = (<img className="logo" src="/assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" />)

    return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
           <Link className="navbar-brand" id="logo" to="/"> {icon} Chutte</Link>
            <ul className="sidebar-font">
              <li id={userOptions[0]}><Link to="dashboard/profile">{userOptions[0]}</Link></li>
              <li id={userOptions[1]}><Link to='/create'>{userOptions[1]}</Link></li>
              <li id={userOptions[2]}><Link to='/current'>{userOptions[2]}</Link></li>
            </ul>
          </div>
        </div>
    );
  }
};
