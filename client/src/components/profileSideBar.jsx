import React from 'react';
import {Link} from 'react-router';

export default class ProfileSideNavbar extends React.Component {

  render() {
    var userOptions = ["User Profile", "Create Listing", "Current Listing"];

    return (
      <div className="col-sm-3 col-md-2 sideBar profileBar">
        <ul className="nav nav-sidebar browse">
          { userOptions.map(function(option, index){
            return <li key={index}><a href="#">{option}</a></li>     
          }) }
        </ul>
      </div>
    );
  }
};
