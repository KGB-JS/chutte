import React from 'react';

class JumboTronButton extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Welcome to Chutte Landing Page!</h1>
             <a className= "btn btn-primary btn-lg" role="button">Explore</a>
        </div>
      </div>
    );
  }
};

export default JumboTronButton;
