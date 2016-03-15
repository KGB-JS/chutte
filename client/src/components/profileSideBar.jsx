import React from 'react';
import {Link} from 'react-router';
import {UserOptions} from './../actions/actionConstants';

export default class ProfileSideNavbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {activeSelection: UserOptions[0]};
  }

  render() {
    var userOptions = ["User Profile", "Create Listing", "Current Listing"];
    var icon = (<img className="logo" src="/assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" />)

    return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
           <Link className="navbar-brand" id="logo" to="/"> {icon} Chutte</Link>
            <ul className="sidebar-font">
              <li id={userOptions[0]}><Link to="dashboard/profile" activeClassName="active">{userOptions[0]}</Link></li>
              <li id={userOptions[1]}><Link to='/create' activeClassName="active">{userOptions[1]}</Link></li>
              <li id={userOptions[2]}><Link to='/current' activeClassName="active">{userOptions[2]}</Link></li>
            </ul>
          </div>
        </div>
    );
  }
};
