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

    return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
            <ul className="sidebar-font">
              <li className={this.state.activeCategory === CategoryFilters[0] ? "active" : ""} id={CategoryFilters[0]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[0]}</li>
              <li className={this.state.activeCategory === CategoryFilters[1] ? "active" : ""} id={CategoryFilters[1]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[1]}</li>
              <li className={this.state.activeCategory === CategoryFilters[2] ? "active" : ""} id={CategoryFilters[2]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[2]}</li>
              <li className={this.state.activeCategory === CategoryFilters[3] ? "active" : ""} id={CategoryFilters[3]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[3]}</li>
              <li className={this.state.activeCategory === CategoryFilters[4] ? "active" : ""} id={CategoryFilters[4]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[4]}</li>
              <li className={this.state.activeCategory === CategoryFilters[5] ? "active" : ""} id={CategoryFilters[5]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[5]}</li>
              <li className={this.state.activeCategory === CategoryFilters[6] ? "active" : ""} id={CategoryFilters[6]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[6]}</li>
              <li className={this.state.activeCategory === CategoryFilters[7] ? "active" : ""} id={CategoryFilters[7]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[7]}</li>
              <li className={this.state.activeCategory === CategoryFilters[8] ? "active" : ""} id={CategoryFilters[8]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[8]}</li>
              <li className={this.state.activeCategory === CategoryFilters[9] ? "active" : ""} id={CategoryFilters[9]} onClick={this.handleFilter.bind(this)}>{CategoryFilters[9]}</li>
            </ul>
          </div>
        </div>
    );
  }
};
