import React from 'react';

var SearchBar = React.createClass({
  getInitialState: function(){
    this.state.searchVal = '';
  },


  render : function(){
    return {
      <input 
        value = {this.state.searchVal};
        onChange={(event)=> this.onChangeFunc(event.target.value)}/>
    }
  },

  onChangeFunc: function(inputVal){
    this.setState({searchVal = inputVal});
  }  

});
