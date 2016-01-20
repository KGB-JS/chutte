import React from 'react';
import HomeNavBar from './../components/homenavbar';
import JumboTronButton from './../components/JumboTronButton';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <HomeNavBar/>
        <JumboTronButton/>
      </div>
    )
  }
};
