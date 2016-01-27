import React, {PropTypes} from 'react';
import DevTools from './devTools';


export default class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <DevTools/>
       </div>
    )
  }
}
