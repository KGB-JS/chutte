import React from 'react';
import NavBar from '../components/navbar';
import CreateListing from '../components/createListing';

export default class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <NavBar/>
        <CreateListing/>
      </div>
    )
  }
}
