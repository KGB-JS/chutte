import React from 'react';
import {connect} from 'react-redux';
import Navbar from './../components/navbar';
import JumboTronButton from './../components/JumboTronButton';
import DashboardTiles from './../components/dashboardTiles';
import MadeBy from './../components/madeBy';
import {userLogout} from './../actions/actionsUserAuth';
import HomeFooter from './../components/homeFooter';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="full">
          <Navbar submitSignout={this.props.submitSignout} user={this.props.userAuth}/>
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
