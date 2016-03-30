import React from 'react';
import {Link} from 'react-router';
import {UserOptions} from './../actions/actionConstants';

export default class ProfileSideNavbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {activeSelection: UserOptions[0]};
  }

  handleClick(e){
    let selection = e.target.id;
    this.setState({activeSelection: selection});
  }

  render() {
    return (
        <div id="wrapper">
          <div id="sidebar-wrapper">
            <ul className="sidebar-font">
              <li className={this.state.activeSelection === UserOptions[0] ? 'active' : ''} id={UserOptions[0]}><Link to="/dashboard" activeClassName="active" id={UserOptions[0]} onClick={this.handleClick.bind(this)}>{UserOptions[0]}</Link></li>
              <li className={this.state.activeSelection === UserOptions[1] ? 'active' : ''} id={UserOptions[1]}><Link to='/dashboard/create' activeClassName="active" id={UserOptions[1]} onClick={this.handleClick.bind(this)}>{UserOptions[1]}</Link></li>
              <li className={this.state.activeSelection === UserOptions[2] ? 'active' : ''} id={UserOptions[2]}><Link to='/dashboard/current' activeClassName="active" id={UserOptions[2]} onClick={this.handleClick.bind(this)}>{UserOptions[2]}</Link></li>
            </ul>
          </div>
        </div>
    );
  }
};
