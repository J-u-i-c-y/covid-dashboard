import React, { Component } from 'react';
import './Charts.scss';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
    };
  }

  render() {
    return (
      <div className="charts">
        <div className="charts__container">
          <p>Charts</p>
        </div>
      </div>
    );
  }
}

export default Charts;
