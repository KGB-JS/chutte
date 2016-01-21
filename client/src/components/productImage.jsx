import React from 'react';

class ProductImage extends React.Component {
  render(){
console.log('-------Product Image props: ', this.props);
    return (
      <div><img src={this.props.image} alt="ProductImage" className="product-image"/></div>
    )
  }
}

export default ProductImage;
