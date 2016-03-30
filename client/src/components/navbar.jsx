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
        <nav className="navbar navbar-default navBrowse">
          <div className="container-fluid chutteGreen">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">{icon} Chutte</Link>
              </div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/browse" activeClassName="active"><span className="glyphicon glyphicon-shopping-cart"></span> Browse</Link></li>
              <li><Link to="/dashboard" activeClassName="active"><span className="glyphicon glyphicon-user"></span> Dashboard</Link></li>
              <li><a onClick={this.handleSignout.bind(this)} activeClassName="active"><span className="glyphicon glyphicon-log-out"></span> Sign out</a></li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">{icon} Chutte</Link>
            </div>
              <ul className="nav navbar-nav navbar-right">
                <li><SignUpModal/></li>
                <li><SignInModal/></li>
              </ul>
          </div>
        </nav>
      )
    }
  }
}



// <nav class="navbar navbar-inverse navbar-static-top custom-navbar" role="navigation">
//   <div class="container">
//     <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
//       <span class="sr-only">Toggle navigation</span>
//       <span class="icon-bar"></span>
//       <span class="icon-bar"></span>
//       <span class="icon-bar"></span>
//     </button>
//     <div class="navbar-header">
//       <a class="navbar-brand" rel="home" href="#" title="Help">
//         Brand
//       </a>
//     </div>
//       <ul class="nav navbar-nav navbar-right">
//         <li>
//           <a href="#" class="fa fa-cog"></a>
//         </li>
//         <li>
//           <a href="#" class="fa fa-home"></a>
//         </li>
//       </ul>

//     <div class="collapse navbar-collapse navbar-right" id="navbar-collapse-1">
//       <ul class="nav navbar-nav">
//         <li><Link to="/browse"><span className="glyphicon glyphicon-shopping-cart"></span> Browse</Link></li>
//         <li><Link to="/dashboard/profile"><span className="glyphicon glyphicon-user"></span> Dashboard</Link></li>
//         <li><a onClick={this.handleSignout.bind(this)}><span className="glyphicon glyphicon-signout"></span> Sign out</a></li>
//       </ul>
//     </div>
//   </div>
// </nav>
