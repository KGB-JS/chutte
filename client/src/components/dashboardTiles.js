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
            <p>Chutte unique reverse auction style guarantees if your item sells it will be above or at your minimum sale price. All you have to do is set the start price and minimum price. Then kick back and wait for your item to sell.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
          <div className="panel-heading">
          <span className="glyphicon glyphicon-usd"></span>
          </div>
            <div className="panel-body">
            <p>Chutte allows sellers to obtain the maximum amount for their products. A reverse auction sale starts with the highest price possible and slowly decreases until the auction ends. Reverse auctions work best with unique items or giving early access to ticket sales. Post an item today to try. </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
          <div className="panel-heading">
          <span className="glyphicon glyphicon-tags"></span>
          </div>
            <div className="panel-body">
            <p>If you are looking for the right place to sell the most exclusive and unique items Chutte is your one stop shop. When dealing with a unique product finding the market demand can be challenging. By using Chutte that is all taken care of. Giving youthe best change for selling your product for as much as possible.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashBoardTile;
