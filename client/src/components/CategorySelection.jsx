import React from 'react';

class CategorySelection extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {categorySelected: ''};
  }

  _handleChange(event) {
    this.setState({categorySelected: event.target.value});
  }

  render() {
    return (
      <select
        value={this.state.categorySelected}
        onChange={this._handleChange.bind(this)}
      >
      <option value="AntiquesCollectibles">Antiques & Collectibles</option>
      <option value="Art">Art</option>
      <option value="Automobiles">Automobiles</option>
      <option value="Clothing">Clothing, Shoes and Accessories</option>
      <option value="Electronics">Entertainment Memorabilia</option>
      <option value="JewelryWatches">Jewelry and Watches</option>
      <option value="TicketsExperiences">Tickets and Experiences</option>
      <option value="Travel">Travel</option>
      </select>
    );
  }
}

export default CategorySelection;
