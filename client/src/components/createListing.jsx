import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {postListing} from './../actions/actionsCreateListing';
import CategorySelection from './CategorySelection';

class CreateListing extends React.Component {
  constructor(props){
    super(props);
    this.state =  {categorySelected: ''};
  }

  _handleChange(event) {
    this.setState({categorySelected: event.target.value});
  }

  submitForm(){
    var itemDetails = {
      productName: this.refs.name.value,
      createdBy : this.refs.name.value,
      category : this.state.categorySelected,
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

        <select
          value={this.state.categorySelected}
          onChange={this._handleChange.bind(this)} >

          <option value="AntiquesCollectibles">Antiques & Collectibles</option>
          <option value="Art">Art</option>
          <option value="Automobiles">Automobiles</option>
          <option value="Clothing">Clothing, Shoes and Accessories</option>
          <option value="Entertainment">Entertainment Memorabilia</option>
          <option value="JewelryWatches">Jewelry and Watches</option>
          <option value="TicketsExperiences">Tickets and Experiences</option>
          <option value="Travel">Travel</option>
        </select>

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
      bindActionCreators(postListing(itemDetails), dispatch)
    }
  }
}

export default connect(mapDispatchToProps)(CreateListing);
