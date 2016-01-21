import React from 'react';
import {connect} from 'react-redux';
import NavBar from './../components/navbar';
import ProductCard from './../components/productCard';
import {fetchProducts} from './../actions/actionsProducts';

class BrowsePage extends React.Component {
  componentDidMount(){
    this.props.fetchAllProducts();
  }

  render(){
    var productCards;
    this.props.products ? productCards = this.props.products.map(product => {
      return <ProductCard product={product} />
    }) : [];

    return (
      <div>
        <NavBar/>
        {productCards}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchAllProducts: function() {
      dispatch(fetchProducts());
    }
  }
}

function mapStateToProps(state){
  return {products: state.productStore.products.productList};
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
