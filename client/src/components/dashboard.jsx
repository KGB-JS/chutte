import React from 'react';
import Navbar from '../components/navbar';
import ProfileSideNavBar from './../components/profileSideBar';

const Dashboard = function({children, submitSignout, userAuth}) {
  return (
    <div>
      <Navbar submitSignout={submitSignout}
         user={userAuth} />
      <ProfileSideNavBar/>
      {children}
    </div>
  )
};

export default Dashboard;
