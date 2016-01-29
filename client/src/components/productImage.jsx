import React from 'react';

class ProductImage extends React.Component {
  render(){
  	console.log(this.props.image)
    return (
      <div className="productImage"><img className="displayed" src={this.props.image}  /></div>
    )
  }
}

export default ProductImage;
