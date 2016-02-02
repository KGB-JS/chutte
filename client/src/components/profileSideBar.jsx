import React from 'react';
import {Link} from 'react-router';
import {UserOptions} from './../actions/actionConstants';

export default class ProfileSideNavbar extends React.Component {
    constructor(props){
       super(props)
    }
    handleFilter(e){
       e.preventDefault();
       this.props.filter(e.target.id);
    }
  render() {
    var userOptions = ["User Profile", "Create Listing", "Current Listing"];
    var icon = (<img className="logo" src="/assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" />)
    return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
          <Link className="navbar-brand" to="/"> {icon} Chutte</Link>
            <ul className="sidebar-font">
              <li id={userOptions[0]} onClick={this.handleFilter.bind(this)}>{userOptions[0]}</li>
              <li id={userOptions[1]} onClick={this.handleFilter.bind(this)}>{userOptions[1]}</li>
              <li id={userOptions[2]} onClick={this.handleFilter.bind(this)}>{userOptions[2]}</li>
            </ul>
          </div>
        </div>
    );
  }
};
