import React from 'react';

class DashBoardTile extends React.Component {
  render(){
    return (
      <div className="container-fluid">
        <div id="infoHeader">
        Why Chutte?
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
          <div className="panel-heading"><span className="glyphicon glyphicon-time"></span>
          </div>
            <div className="panel-body">
            <h2>Time on your side</h2>
            <p>Working off the guidlines given to Chutte, an individually tailored, price schedule is created for each item. This price schedule emulates the idea of supply and demand. As time passes, Chutte adjusts to reach an optimal price point for buyers and sellers.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
          <div className="panel-heading">
          <span className="glyphicon glyphicon-user"></span>
          </div>
            <div className="panel-body">
            <h2>Buy and Sell</h2>
            <p>Chutte does the extra work for you. Many online marketplaces bring people together to buy and sell. What happens when an item does not sell or it is too expensive? It ends up being an opportunity missed. Chutte is in place to remove those barriers.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <div className="panel panel-primary">
          <div className="panel-heading">
          <span className="glyphicon glyphicon-tags"></span>
          </div>
            <div className="panel-body">
            <h2>Supply and demand</h2>
            <p>We want everyone to get the best deal for their listings. From the beginning of time, people have had the problem, what should I sell this for? Our pricing algorithm solves that problem for you and helps you put focus back on the product.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashBoardTile;
