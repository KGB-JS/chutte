import React from 'react';
import {connect} from 'react-redux';
import NavBar from './../components/navbar';
import SearchBar from './../components/search';
import ProductCard from './../components/productCard';
import BrowseSideBar from './../components/BrowseSideBar';
import ProductList from './../components/productList';

class BrowsePage extends React.Component {
  render(){
    return (
    <div>
      <NavBar/>
        <div className="container-fluid">
        <BrowseSideBar className="col-xs-2 col-sm-2 col-md-2"/>
          <SearchBar className="col-xs-offset-2 serach-bar col-md-10 col-md-offset-2 col-sm-10 col-sm-offset-2"/>
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

export default connect(mapStateToProps)(BrowsePage);
