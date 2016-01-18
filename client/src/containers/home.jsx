import React from 'react';
import NavBar from './../components/navbar';
import JumboTronButton from './../components/homeJumbotron';

class HomePage extends React.Component {
  render() {
    return (
      <NavBar/>
      <JumboTronButton/>
    )
  }
};

ReactDOM.render(<HomePage/>, document.getElementById('app'));
