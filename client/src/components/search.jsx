import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchVal : '' };
  }

  render() {
    return (
      <div className="col-sm-10 col-sm-offset-2 col-md-10 col-md-offset-2">
      <div className="input-group">
      <input type="text"
      className="form-control" 
      placeholder="Search for..." 
      value = {this.state.searchVal}
          onChange={(event) => this.onChangeFunc(event.target.value)} />
      <span className="input-group-btn">
        <button className="btn btn-default" type="button">Search</button>
      </span>
    </div>
    </div>
    )
  }

  onChangeFunc(inputVal){
    this.setState({searchVal : inputVal});
  }
}

export default SearchBar;
