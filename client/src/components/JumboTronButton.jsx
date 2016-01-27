import React from 'react';
import {Link} from 'react-router';

class JumboTronButton extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Explore Amazing Offers</h1>
          <Link to="/browse"><button type="button" className="btn btn-primary center-block"><h4>Explore!</h4></button></Link>
        </div>
      </div>
    );
  }
};

export default JumboTronButton;
