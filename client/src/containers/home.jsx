import React from 'react';
import HomeNavBar from './../components/homenavbar';
import JumboTronButton from './../components/JumboTronButton';
import DashboardTiles from './../components/dashboardTiles';

export default class Home extends React.Component {
  render() {
    return (
        <div>
      <div className="full">
        <HomeNavBar/>
        <JumboTronButton/>
      </div>
      <div className="homeInfo">
      <DashboardTiles/>
      </div>
      </div>
    )
  }
};
