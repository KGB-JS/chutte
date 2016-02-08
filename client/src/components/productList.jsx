import React from 'react';
import ProductCard from './../components/productCard';

export default class ProductList extends React.Component{
  constructor(props) {
    super(props);
    this.state = { searchVal : '' };
  }

  onChangeFunc(value){
    this.setState({searchVal: value });
  }

  renderProductCards(){
    if(this.state.searchVal.length > 0){ 
      var matchingItems = [];
      var searchTerm = this.state.searchVal.trim().toLowerCase();
        this.props.products.filter(function(product){
          var checkVal = product.productName.trim().toLowerCase();
          if(checkVal.indexOf(searchTerm) !== -1){
              matchingItems.push(product);
            }     
        });
      return matchingItems.map((product, index) => {
        return <ProductCard key={index} productDetail={product} resetBuyMsg={this.props.resetBuyMsg}/>
      })
    } else {
      return this.props.products.map((product, index) => {
        return <ProductCard key={index} productDetail={product} resetBuyMsg={this.props.resetBuyMsg}/>
      });
    };

  }

  render(){
    return(
    <div>
      <div className="col-sm-12 col-md-12 input-lg">
       <div>
         <input className="col-md-offset-3 col-md-6 input-lg" type="text"
          placeholder="Search for..." 
          value = {this.state.searchVal}
          onChange={(event) => this.onChangeFunc(event.target.value)} />
              <span className="input-group-btn">
            </span>
        </div>
      </div>
      <div>
        {this.renderProductCards()}
      </div>
    </div>
    )
  }
};
