import React from 'react';
import {Link} from 'react-router';

export default class BrowseSideNavbar extends React.Component {

  render() {
    var category = ["Antiques", "Art", "Automobiles", "clothing", "electronics",
    "Entertainment", "Jewelry", "Tickets and Experiences", "Travel"];
    return (
         <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar browse">
              {category.map(function(subCategory, index) {
                return <li key={index}><a href={index}>{subCategory}</a></li>;
              })}
          </ul>
        </div>
    );
  }
};
