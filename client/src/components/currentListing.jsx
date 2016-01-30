import React from 'react';
import {connect} from 'react-redux';
import ProductCard from './../components/productCard';
import ProductList from './../components/productList';

class CurrentListing extends React.Component {
  render(){
    return (
    <div>
        <div className="container-fluid">
          <row>
            <div className="col-xs-offset-2 col-sm-offset-2 col-sm-10 col-md-10 col-md-offset-2">
              <ProductList products={this.props.products}/>
            </div>
          </row>
        </div>
    </div>
    )
  }
}

function mapStateToProps(state){
  return {products: state.productStore.products.productList};
}

//export default connect(mapStateToProps)(BrowsePage);
