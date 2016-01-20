import React from 'react';
import {connect} from 'react-redux';
import NavBar from './../components/navbar';
import ProductCard from './../components/productCard';

class BrowsePage extends React.Component {

  render(){
    var productCards = this.props.products.map(product => {
      return <ProductCard product={product} />
    })

    return (
      <div>
        <NavBar/>
      <div>{productCards}</div>
    </div>
    )
  }
}

BrowsePage.propType = {
  products: PropType.object
}

function mapStateToProps(state){
  return {products: state.products};
}

export default connect(mapStateToProps)(BrowsePage);
