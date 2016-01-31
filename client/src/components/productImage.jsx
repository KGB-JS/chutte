import React from 'react';
import {Grid, Thumbnail, Button,Row, Col } from 'react-bootstrap';

class ProductImage extends React.Component {
  render(){
    return (

      <div className="container1">
      
      <img  src={this.props.image}  />
      </div>
    )
  }
}

export default ProductImage;
