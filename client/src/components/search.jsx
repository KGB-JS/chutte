import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchVal : '' };
  }

  render() {
    return (
      <div className="search-bar">
        <input className="search-bar"
          value = {this.state.searchVal}
          onChange={(event) => this.onChangeFunc(event.target.value)} />
          <button className="butn btn-default" type="button">Search</button>
      </div>
    )
  }

  onChangeFunc(inputVal){
    this.setState({searchVal : inputVal});
  }
}

export default SearchBar;
