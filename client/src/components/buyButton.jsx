import React from 'react';

class BuyButton extends React.Component {
  handleClick(event) {
    this.props.buyProduct()
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Buy
      </button>
    );
  }
}

export default BuyButton;
