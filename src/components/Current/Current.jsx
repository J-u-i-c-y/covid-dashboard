import React, { Component } from 'react';
import './Current.scss';

class Current extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     count: props.count,
  //   };
  // }

  render() {
    return (
      <div className="current">
        <div className="current__container">
          <p>Current country is: {this.props.country}</p>
        </div>
      </div>
    );
  }
}

export default Current;
