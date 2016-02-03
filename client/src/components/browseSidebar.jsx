import React from 'react';
import {Link} from 'react-router';
import {CategoryFilters} from './../actions/actionConstants';

export default class BrowseSideNavbar extends React.Component {
  constructor(props){
     super(props)
   }

  handleFilter(e){
     e.preventDefault();
     this.props.filter(e.target.id);
  }
  render() {
    let categories = CategoryFilters;
        var icon = (<img className="logo" src="/assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" />)
    return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
          <Link className="navbar-brand" id="logo" to="/"> {icon} Chutte</Link>
            <ul className="sidebar-font">
              <li id={categories[0]} onClick={this.handleFilter.bind(this)}>{categories[0]}</li>
              <li id={categories[1]} onClick={this.handleFilter.bind(this)}>{categories[1]}</li>
              <li id={categories[2]} onClick={this.handleFilter.bind(this)}>{categories[2]}</li>
              <li id={categories[3]} onClick={this.handleFilter.bind(this)}>{categories[3]}</li>
              <li id={categories[4]} onClick={this.handleFilter.bind(this)}>{categories[4]}</li>
              <li id={categories[5]} onClick={this.handleFilter.bind(this)}>{categories[5]}</li>
              <li id={categories[6]} onClick={this.handleFilter.bind(this)}>{categories[6]}</li>
              <li id={categories[7]} onClick={this.handleFilter.bind(this)}>{categories[7]}</li>
              <li id={categories[8]} onClick={this.handleFilter.bind(this)}>{categories[8]}</li>
              <li id={categories[9]} onClick={this.handleFilter.bind(this)}>{categories[9]}</li>
            </ul>
          </div>
        </div>
    );
  }
};
