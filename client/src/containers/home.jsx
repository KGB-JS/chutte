import React from 'react';
import {connect} from 'react-redux';
import HomeNavBar from './../components/homenavbar';
import JumboTronButton from './../components/JumboTronButton';
import DashboardTiles from './../components/dashboardTiles';
import {userLogout} from './../actions/actionsUserAuth';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="full">
          <HomeNavBar submitSignout={this.props.submitSignout} user={this.props.userAuth}/>
          <JumboTronButton/>
        </div>
        <div className="homeInfo">
          <DashboardTiles/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitSignout: function(){
      dispatch(userLogout());
    }
  }
}

function mapStateToProps(state){
  return {
    userAuth: state.userStore.userAuth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
