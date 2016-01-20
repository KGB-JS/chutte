import React from 'react';
import NavBar from './../components/navbar';
import JumboTronButton from './../components/homeJumbotron';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <JumboTronButton/>
      </div>
    )
  }
};
