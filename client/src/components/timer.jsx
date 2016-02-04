import React from 'react';
import numeral from 'numeral';

class Timer extends React.Component{
  constructor(props){
    super(props)
    this.state = {secondsRemaining:  0, auctionEnd: this.props.nextUpdateTime}
  }

  tick(){
    var counter = this.state.secondsRemaining - 1;
    if(counter >= 0){
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
    let time = this.state.secondsRemaining;

    return(
      <p className="productinfo">Time Remaining: {numeral(time).format('00:00:00')}
      </p>
    )
  }
}

export default Timer
