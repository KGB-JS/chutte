import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchVal : '' };
  }

  render() {
    return (
      <div>
        <input 
          value = {this.state.searchVal}
          onChange={(event) => this.onChangeFunc(event.target.value)} />
      </div>
    )
  }

  onChangeFunc(inputVal){
    this.setState({searchVal : inputVal});
  }
}

export default SearchBar;
