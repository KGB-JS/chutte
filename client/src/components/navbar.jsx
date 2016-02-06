import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import SignUpModal from './../components/signupModal';
import SignInModal from './../components/loginModal';

export default class DefaultNavbar extends React.Component {
  handleSignout(e){
     e.preventDefault();
     this.props.submitSignout();
   }

  render() {
    let icon = (<span><img className="logo" src="../assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" /></span>);

    if(this.props.user.token !== ''){
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link  to="/" className="navbar-brand">{icon} Chutte</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem><Link to="/browse"><span className="glyphicon glyphicon-shopping-cart"></span> Browse</Link></NavItem>
              <NavItem><Link to="/dashboard/profile"><span className="glyphicon glyphicon-user"></span> Dashboard</Link></NavItem>
              <NavItem><a onClick={this.handleSignout.bind(this)}>Sign out</a></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link  to="/" className="navbar-brand">{icon} Chutte</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem><SignUpModal/></NavItem>
              <NavItem><SignInModal/></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    }
  }
}
