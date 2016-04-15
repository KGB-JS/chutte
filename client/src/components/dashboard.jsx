import React from 'react';
import Navbar from '../components/navbar';
import ProfileSideNavBar from './../components/profileSideBar';

const Dashboard = function({children, submitSignout, userAuth, signInUser, signupUser}) {
  return (
    <div>
      <Navbar submitSignout={submitSignout} user={userAuth} signInUser={signInUser} signupUser={signupUser}/>
      <ProfileSideNavBar/>
      {children}
    </div>
  )
};

export default Dashboard;
