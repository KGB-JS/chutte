import React from 'react';
import ReactDOM from 'react-dom';
import {createListing, postListing} from './../actions/actionsCreateListing';
import DropZone from 'react-dropzone';
//import ImageDrop from './imageDrop';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class CreateListing extends React.Component {
  constructor(props){
    super(props);
    this.state = { categorySelected:'Choose a Category', description: "", startDate: moment(), endDate: moment(), imgFile: ['mynuts'] };
  }

  _descriptionInput(details){
    this.setState({ description: details.target.value });
  }

  _handleChange(event){
    this.setState({categorySelected: event.target.value});
  }

  _startDate(firstDate) {
    this.setState({startDate: firstDate});
  }

  _endDate(lastDate) {
    this.setState({endDate: lastDate});
  }

  onDrop(file) {
    this.setState({imgFile: file});
    this.file = file
    console.log(this.file)
  }

  submitForm(){
    console.log(this.onDrop.file)
    var itemDetails ={product: {
      productName: String(this.refs.name.value),
      createdBy : String(this.refs.name.value),
      category : String(this.state.categorySelected),
      quantity : Number(this.refs.quantity.value),
      auctionEnds : Number(this.state.endDate.valueOf()),
      price: Number(this.refs.price.value),
      minPrice: Number(this.refs.minPrice.value),
      imgFile: this.onDrop.file
    }};
    console.log(itemDetails)
    this.props.submitListing(itemDetails);
  }

  render() {
    return (
      <div className="col-sm-offset-3 col-md-10 col-md-offset-2">
      <form role="form">
      <div className="col-md-5">
        <div>
            <DropZone multiple='false' onDrop={this.onDrop} value={this.state.imgFile} width={150} height={100}>
              <div>Upload an Image here for your product.</div>
            </DropZone>
        </div>
      </div>

      <div className="col-sm-offset-3 col-md-10 col-md-offset-2">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" className="form-control" placeholder="Product Name" ref="name"/>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" className="form-control" placeholder="Quantity" ref="quantity"/>
        </div>

        <div className="form-group">
          <DatePicker
            placeholder="Start date"
            selected={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this._startDate.bind(this)} />

          <DatePicker
            placeholder="End date"
            selected={this.state.endDate}
            startDate={this.state.startDate}
            aunctionEnds={this.state.endDate}
            onChange={this._endDate.bind(this)} />
        </div>

        <select value={this.state.categorySelected}
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
          <input type="number" className="form-control" placeholder="Price" ref="price"/>
        </div>

        <div className="form-group">
          <label>Minimum Sales Price</label>
          <input type="number" className="form-control" placeholder="Minimum Sales Price" ref="minPrice"/>
        </div>


        <button type="button" onClick={this.submitForm.bind(this)}>List Item</button>
        </div>
        </form>
      </div>
    )
  }
}

export default CreateListing
