import React from 'react';

class JumboTronButton extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="jumbotron">
          <h1>Welcome to Chutte Landing Page!</h1>
             <a class = "btn btn-primary btn-lg" role="button">Explore</a>
        </div>
      </div>
    );
  }
};

export default JumboTronButton;
