import React from 'react';
import {createListing, postListing} from './../actions/actionsCreateListing';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class CreateListing extends React.Component {
  constructor(props){
    super(props);

    this.state = { categorySelected: '', startDate: moment(), endDate: moment() };
  }


  _handleChange(value){
    console.log(value.target.text, "this should return the value");
    this.setState({categorySelected: value});
  }

  _startDate(firstDate) {
    this.setState({startDate: firstDate});
  }

  _endDate(lastDate) {
    this.setState({endDate: lastDate});
  }

  submitForm(){
    var itemDetails = {
      productName: String(this.refs.name.value),
      createdBy : String(this.refs.name.value),
      category : String(this.state.categorySelected),
      quantity : Number(this.refs.quantity.value),
      auctionEnds : String(this.state.endDate),
      price: Number(this.refs.price.value),
      minPrice: Number(this.refs.minPrice.value)
    };
    this.props.submitListing(itemDetails);
  }

  render() {
    return (
      <form role="form">
        <div className="form col-md-8">
          <label>Name</label>
          <input type="text" ref="name" className="form-group col-md-4"/>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="text" ref="quantity" className="form-group col-md-4"/>
        </div>

        <div className="form-group">
          <DatePicker
            placeholderText="Start date"
            selected={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this._startDate.bind(this)} />

          <DatePicker
            placeholderText="End date"
            selected={this.state.endDate}
            startDate={this.state.startDate}
            aunctionEnds={this.state.endDate}
            onChange={this._endDate.bind(this)} />
        </div>

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

        <div className="form-group">
          <label>Price</label>
          <input type="number" ref="price" className="form-group col-md-2"/>
        </div>

        <div className="form-group">
          <label>Minimum Sales Price</label>
          <input type="number" ref="minPrice" className="form-group col-md-2"/>
        </div>

        <button type="button" onClick={this.submitForm.bind(this)}>List Item</button>
      </form>
    )
  }
}

export default CreateListing
