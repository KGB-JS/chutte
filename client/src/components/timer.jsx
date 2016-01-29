import React from 'react';
import numeral from 'numeral';

class Timer extends React.Component{
  constructor(props){
    super(props)
    this.state = {secondsRemaining:  0}
  }

  tick(){
    var counter = this.state.secondsRemaining;
    this.setState({secondsRemaining: --counter});
    if(counter <= 0) {
      clearInterval(this.interval);
    }
  }

  componentDidMount(){
    this.setState({secondsRemaining: this.props.secondsRemaining});
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
