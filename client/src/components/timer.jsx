import React from 'react';
import numeral from 'numeral';
import moment from 'moment';

class Timer extends React.Component{
  constructor(props){
    super(props)
    this.state = {secondsRemaining:  0, auctionEnd: this.props.nextUpdateTime}
  }

  tick(){
    if(this.state.secondsRemaining > 0){
      let counter = this.state.secondsRemaining - 1;
      this.setState({secondsRemaining: counter});
    } else{
      clearInterval(this.interval);
    }
  }

  componentDidMount(){
    let milliseconds = this.props.nextUpdateTime - Date.now();
    let seconds = (milliseconds / 1000);
    this.setState({secondsRemaining: seconds});
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    let time;
    if(((this.props.nextUpdateTime - Date.now()) / 1000) > 172800){
      let today = moment();
      let endDate = moment.unix((this.props.nextUpdateTime / 1000));
      time = today.to(endDate);
    } else {
      time = numeral(this.state.secondsRemaining).format('00:00:00')
    }

    return(
      <p className="productinfo">Auction Ends: {time}
      </p>
    )
  }
}

export default Timer
