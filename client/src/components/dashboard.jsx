import React from 'react';
import DefaultNavBar from '../components/navbar';
import ProfileSideNavBar from './../components/profileSideBar';

const Dashboard = function({children, submitSignout, userAuth}) {
  return (
    <div>
      <DefaultNavBar submitSignout={submitSignout}
         user={userAuth} />
      <ProfileSideNavBar/>
      {children}
    </div>
  )
};

export default Dashboard;
