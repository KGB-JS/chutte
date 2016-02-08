import React from 'react';
import ReactDOM from 'react-dom';
import {createListing, postListing} from './../actions/actionsCreateListing';
import DropZone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {CategoryFilters} from './../actions/actionConstants';

export default class CreateListing extends React.Component {
  constructor(props){
    super(props);
    this.state = { categorySelected: 'Select a category', description: '', startDate: moment(), endDate: moment(), imgFile: '', validateCategory: true };
  }

  validateForm(event){
    if(this.state.password === event.target.value){
      this.setState({ validation: false });
    } else {
      this.setState({ validation: true });
    }
  }

  _descriptionInput(details){
    this.setState({ description: details.target.value });
  }

  _handleChange(event){
    if(event.target.value !== 'Select a category'){
      this.setState({ validateCategory: false });
    } else {
      this.setState({ validateCategory: true });
    }  
    this.setState({categorySelected: event.target.value});
  }

  _startDate(firstDate) {
    this.setState({startDate: firstDate});
  }

  _endDate(lastDate) {
    this.setState({endDate: lastDate});
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleFile(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        imgFile: upload.target.result,
      });
    };

    reader.readAsDataURL(file);
  }

  submitForm(){
    var itemDetails ={product: {
      productName: String(this.refs.name.value),
      createdBy : String(this.refs.name.value),
      category : String(this.state.categorySelected),
      quantity : Number(this.refs.quantity.value),
      auctionEnds : Number(this.state.endDate.valueOf()),
      price: Number(this.refs.price.value),
      minPrice: Number(this.refs.minPrice.value),
      imgFile: this.state.imgFile,
      description: String(this.state.description)
    }};

    this.props.submitListing(itemDetails, this.props.user.token);

  }

  render() {
    let failedPostMSG = this.props.productListing.postErrorMSG === true ? <p className="alert alert-danger alert-dismissible">Please Fill out form completely</p> : "";
    var defaultV = "Select a category";
    return (
      <div className="bumpDown col-sm-offset-3 col-md-10 col-md-offset-2">

      <form role="form">
      <div className="col-md-5">
        <div className="row text-center">
        <div className="container2">
          <img src={ this.state.imgFile } height="250"></img>
        </div>
        <label for="file-upload" className="btn btn-primary custom-file-upload">
        <span className="glyphicon glyphicon-upload"></span> Upload Picture
          <div onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile.bind(this)} />
          </div>
          </label>
        </div>
        <div>
        <h5>Item Description</h5>
        <textarea className="form-control" value={this.state.description} onChange={this._descriptionInput.bind(this)}> </textarea>
        </div>
      </div>

      <div className="col-md-5">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" className="form-control" placeholder="Enter Product Name" ref="name"/>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" className="form-control" min="1" placeholder="Enter Quantity" ref="quantity"/>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <DatePicker
            placeholder="Select Start date"
            selected={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this._startDate.bind(this)} />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <DatePicker
            placeholder="Select End date"
            selected={this.state.endDate}
            startDate={this.state.startDate}
            aunctionEnds={this.state.endDate}
            onChange={this._endDate.bind(this)} />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select className="form-control" id="select" value={this.state.categorySelected}
            onChange={this._handleChange.bind(this)}>
            <option>{defaultV}</option>
            <option value={CategoryFilters[1]}>{CategoryFilters[1]}</option>
            <option value={CategoryFilters[2]}>{CategoryFilters[2]}</option>
            <option value={CategoryFilters[3]}>{CategoryFilters[3]}</option>
            <option value={CategoryFilters[4]}>{CategoryFilters[4]}</option>
            <option value={CategoryFilters[5]}>{CategoryFilters[5]}</option>
            <option value={CategoryFilters[6]}>{CategoryFilters[6]}</option>
            <option value={CategoryFilters[7]}>{CategoryFilters[7]}</option>
            <option value={CategoryFilters[8]}>{CategoryFilters[8]}</option>
            <option value={CategoryFilters[9]}>{CategoryFilters[9]}</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" className="form-control" min="1" placeholder="Enter Starting Price" ref="price"/>
        </div>

        <div className="form-group">
          <label>Minimum Sales Price</label>
          <input type="number" className="form-control" min="1" placeholder="Enter Minimum Sales Price" ref="minPrice"/>
        </div>

        {failedPostMSG}
        <button className="btn btn-primary" type="button" onClick={this.submitForm.bind(this)} disabled={ this.state.validateCategory }>List Item</button>
        </div>
        </form>
      </div>
    )
  }
}

export default CreateListing
