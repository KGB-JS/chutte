import React from 'react';

class DashBoardTile extends React.Component {
  render(){
    return ( 
      <div className="container-fluid">
        <div id="infoHeader">
        Information
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
          <div className="panel-heading"><span className="glyphicon glyphicon-time"></span>
          </div>
            <div className="panel-body">
            <p>Ut scelerisque nisi sit amet erat pretium, id dignissim orci fringilla. Integer nec pellentesque libero, in facilisis eros. Vestibulum interdum efficitur lacus id posuere. Quisque tincidunt aliquet felis posuere porttitor. Praesent eget arcu condimentum, finibus ex et, tempor arcu. Morbi dictum, dui non maximus tempor, arcu quam feugiat dui, sit amet lacinia justo nisi nec nisl. Curabitur velit lorem, rutrum a tellus vel, maximus lobortis urna. Vestibulum elementum libero ipsum, sit amet varius urna placerat ac.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
          <div className="panel-heading">
          <span className="glyphicon glyphicon-usd"></span>
          </div>
            <div className="panel-body">
            <p>Ut scelerisque nisi sit amet erat pretium, id dignissim orci fringilla. Integer nec pellentesque libero, in facilisis eros. Vestibulum interdum efficitur lacus id posuere. Quisque tincidunt aliquet felis posuere porttitor. Praesent eget arcu condimentum, finibus ex et, tempor arcu. Morbi dictum, dui non maximus tempor, arcu quam feugiat dui, sit amet lacinia justo nisi nec nisl. Curabitur velit lorem, rutrum a tellus vel, maximus lobortis urna. Vestibulum elementum libero ipsum, sit amet varius urna placerat ac.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
          <div className="panel-heading">
          <span className="glyphicon glyphicon-tags"></span>
          </div>
            <div className="panel-body">
            <p>Ut scelerisque nisi sit amet erat pretium, id dignissim orci fringilla. Integer nec pellentesque libero, in facilisis eros. Vestibulum interdum efficitur lacus id posuere. Quisque tincidunt aliquet felis posuere porttitor. Praesent eget arcu condimentum, finibus ex et, tempor arcu. Morbi dictum, dui non maximus tempor, arcu quam feugiat dui, sit amet lacinia justo nisi nec nisl. Curabitur velit lorem, rutrum a tellus vel, maximus lobortis urna. Vestibulum elementum libero ipsum, sit amet varius urna placerat ac.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashBoardTile;
