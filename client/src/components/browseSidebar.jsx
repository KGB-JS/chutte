import React from 'react';
import {Link} from 'react-router';
import {CategoryFilters} from './../actions/actionConstants';

export default class BrowseSideNavbar extends React.Component {
  constructor(props){
     super(props);
     this.state = {activeCategory: CategoryFilters[0]};
   }

  handleFilter(e){
     e.preventDefault();
     let category = e.target.id;
     this.props.filter(category);
     this.setState({activeCategory: category});
  }
  render() {
    let categories = CategoryFilters;
        var icon = (<img className="logo" src="/assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" />)
    return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
          <Link className="navbar-brand" id="logo" to="/"> {icon} Chutte</Link>
            <ul className="sidebar-font">
              <li className={this.state.activeCategory === categories[0] ? "active" : ""} id={categories[0]} onClick={this.handleFilter.bind(this)}>{categories[0]}</li>
              <li className={this.state.activeCategory === categories[1] ? "active" : ""} id={categories[1]} onClick={this.handleFilter.bind(this)}>{categories[1]}</li>
              <li className={this.state.activeCategory === categories[2] ? "active" : ""} id={categories[2]} onClick={this.handleFilter.bind(this)}>{categories[2]}</li>
              <li className={this.state.activeCategory === categories[3] ? "active" : ""} id={categories[3]} onClick={this.handleFilter.bind(this)}>{categories[3]}</li>
              <li className={this.state.activeCategory === categories[4] ? "active" : ""} id={categories[4]} onClick={this.handleFilter.bind(this)}>{categories[4]}</li>
              <li className={this.state.activeCategory === categories[5] ? "active" : ""} id={categories[5]} onClick={this.handleFilter.bind(this)}>{categories[5]}</li>
              <li className={this.state.activeCategory === categories[6] ? "active" : ""} id={categories[6]} onClick={this.handleFilter.bind(this)}>{categories[6]}</li>
              <li className={this.state.activeCategory === categories[7] ? "active" : ""} id={categories[7]} onClick={this.handleFilter.bind(this)}>{categories[7]}</li>
              <li className={this.state.activeCategory === categories[8] ? "active" : ""} id={categories[8]} onClick={this.handleFilter.bind(this)}>{categories[8]}</li>
              <li className={this.state.activeCategory === categories[9] ? "active" : ""} id={categories[9]} onClick={this.handleFilter.bind(this)}>{categories[9]}</li>
            </ul>
          </div>
        </div>
    );
  }
};
