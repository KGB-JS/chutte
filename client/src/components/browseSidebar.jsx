import React from 'react';
import {Link} from 'react-router';

export default class BrowseSideNavbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Antiques & Collectibles</a></li>
              <li><a href="#">Art</a></li>
              <li><a href="#">Automobiles</a></li>
              <li><a href="#">Clothing, Shoes & Accessories</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Entertainment Memorabilia</a></li>
              <li><a href="#">Jewelry & Watches</a></li>
              <li><a href="#">Tickets & Experiences</a></li>
              <li><a href="#">Travel</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
