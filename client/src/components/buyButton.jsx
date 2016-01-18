import React from 'react';

class BuyButton extends React.Component {
  getInitialState() {
    return {bought: false};
  }

  handleClick(event) {
    this.setState({bought: !this.state.bought});
  }

  render() {
    var text = this.state.bought ? 'bought' : 'haven\'t bought';
    return (
      <p onClick={this.handleClick}>
        You {text} this.
      </p>
    );
  }
}

export default BuyButton;
