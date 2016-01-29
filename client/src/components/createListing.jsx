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
    this.state = { categorySelected:'Choose a Category', description: "", startDate: moment(), endDate: moment(), imgFile: '' };
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

  // onDrop(file) {
  //   this.setState({imgFile: file});
  //   this.file = file
  //   console.log(this.file)
  // }
  handleSubmit(e) {
    e.preventDefault();
  }

  handleFile(e) {
    var self = this;
    console.log(self)
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        imgFile: upload.target.result,
      });
    }

    reader.readAsDataURL(file);
  }

  submitForm(){
    console.log(this.state.imgFile)
    var itemDetails ={product: {
      productName: String(this.refs.name.value),
      createdBy : String(this.refs.name.value),
      category : String(this.state.categorySelected),
      quantity : Number(this.refs.quantity.value),
      auctionEnds : Number(this.state.endDate.valueOf()),
      price: Number(this.refs.price.value),
      minPrice: Number(this.refs.minPrice.value),
      imgFile: this.state.imgFile
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
        <label for="file-upload" className="custom-file-upload">
        <span className="glyphicon glyphicon-upload"></span> Upload Picture
          <div onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile.bind(this)} />
          </div>
          </label>
        </div>
      </div>

      <div className="col-md-5">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" className="form-control" placeholder="Product Name" ref="name"/>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" className="form-control" min="0" placeholder="Quantity" ref="quantity"/>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <DatePicker
            placeholder="Start date"
            selected={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this._startDate.bind(this)} />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <DatePicker
            placeholder="End date"
            selected={this.state.endDate}
            startDate={this.state.startDate}
            aunctionEnds={this.state.endDate}
            onChange={this._endDate.bind(this)} />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select className="form-control" id="select" value={this.state.categorySelected}
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
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" className="form-control" min="0" placeholder="Price" ref="price"/>
        </div>

        <div className="form-group">
          <label>Minimum Sales Price</label>
          <input type="number" className="form-control" min="0" placeholder="Minimum Sales Price" ref="minPrice"/>
        </div>


        <button className="btn btn-primary" type="button" onClick={this.submitForm.bind(this)}>List Item</button>
        </div>
        </form>
      </div>
    )
  }
}

export default CreateListing
