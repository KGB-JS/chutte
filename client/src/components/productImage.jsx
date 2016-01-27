import React from 'react';

class ProductImage extends React.Component {
  render(){
    return (
      <div className="productImage"><img className="displayed" src={this.props.image}  /></div>
    )
  }
}

export default ProductImage;
