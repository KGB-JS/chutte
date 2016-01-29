import React from 'react';

class Timer extends React.Component{
  constructor(props){
    super(props)
    this.secondsRemaining = 0;
  }

  tick(){
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if(this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  }

  componentDidMount(){
    this.setState({secondsRemaining: this.props.secondsRemaining});
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    return(
      <div>Time Remaining: {this.state.secondsRemaining}
      </div>
    )
  }
}

export default Timer
