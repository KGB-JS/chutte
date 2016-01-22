import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {startDate : moment()};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    this.setState({
      startDate: date
    });
  }

  render(){
   return (
      <div>
        <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
      </div>
    )
  }
};
