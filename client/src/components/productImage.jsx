import React from 'react';

class ProductImage extends React.Component {
  render(){
    return (
      <div className="productImage"><img src={this.props.image}  /></div>
    )
  }
}

export default ProductImage;
