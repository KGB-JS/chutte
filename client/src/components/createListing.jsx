import React from 'react';
import {connect} from 'react-redux';
import {createListing} from './../actions/actionsCreateListing';
import CategorySelection from './CategorySelection';

class CreateListing extends React.Component {
  constructor(props){
    super(props);
  }

  submitForm(){
    var itemDetails = {
      productName: this.refs.name.value,
      createdBy : this.refs.name.value,
      category : this.refs.category.value,
      quantity : this.refs.quantity.value,
      price: this.refs.price.value,
      minPrice: this.refs.minPrice.value
    };

    this.props.submitListing(itemDetails);
  }



  render() {
    return (
      <form role="form">
      <div>
        <label>Name</label>
        <input type="text" ref="name" />

        <label>Quantity</label>
        <input type="text" ref="quantity"/>

        <label>Price</label>
        <input type="text" ref="price" />
        <label>Minimum Sales Price</label>
        <input type="text" ref="minPrice" />
     
        <button type="button" onClick={this.submitForm.bind(this)}>List Item</button>
      </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitListing: function(itemDetails){
      dispatch(createListing(itemDetails))
    }
  }
}



export default connect(mapDispatchToProps)(CreateListing);
