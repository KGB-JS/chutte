import React from 'react';

class HomeFooter extends React.Component {
  render(){
    let octocat = (<span><img className="octocat" src="../assets/octocat.png"  alt="GitHub Logo" height="75" width="75" /></span>);
    return (
        <footer className="footer">
        <br/>
         <div className="footerImg">
           <a href="https://github.com/KGB-JS/chutte">{octocat}</a>
         </div>
        </footer>
    )
  }
}

export default HomeFooter;
