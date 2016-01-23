import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../components/navbar';
import CreateListing from '../components/createListing';
import {postListing} from './../actions/actionsCreateListing';

class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <NavBar/>
        <CreateListing submitListing={this.props.submitListing}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitListing: function(item) {
      bindActionCreators(postListing(item), dispatch);
    }
  }
}


export default connect(mapDispatchToProps)(Dashboard)
