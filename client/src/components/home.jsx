import React from 'react';
import Navbar from './../components/navbar';
import JumboTronButton from './../components/JumboTronButton';
import DashboardTiles from './../components/dashboardTiles';
import MadeBy from './../components/madeBy';
import HomeFooter from './../components/homeFooter';

const Home = function({submitSignout, userAuth}) {
  return (
    <div>
      <div className="full">
        <Navbar submitSignout={submitSignout} user={userAuth}/>
        <JumboTronButton/>
      </div>
      <div className="homeInfo">
        <DashboardTiles/>
      </div>
      <div className="homeInfo">
        <MadeBy/>
      </div>
      <div>
        <HomeFooter/>
      </div>
    </div>
  )
};

export default Home;
