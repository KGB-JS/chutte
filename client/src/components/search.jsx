import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchVal : '' };
  }

  render() {
    return (
      <div className="col-sm-12 col-md-12 search-bar">
      <div className="input-group">
      <input type="text"
      className="form-control" 
      placeholder="Search for..." 
      value = {this.state.searchVal}
          onChange={(event) => this.onChangeFunc(event.target.value)} />
    </div>
    </div>
    )
  }

  onChangeFunc(inputVal){
    this.setState({searchVal : inputVal});
  }
}

export default SearchBar;
