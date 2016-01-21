import React from 'react';
import {Link} from 'react-router';

class JumboTronButton extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Welcome to Chutte Landing Page!</h1>
          <Link className="btn btn-lg btn-primary" to="/browse">Explore</Link>
        </div>
      </div>
    );
  }
};

export default JumboTronButton;
