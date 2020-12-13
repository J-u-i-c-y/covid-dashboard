import React, { Component } from 'react';
import './Charts.scss';

class Charts extends Component {
  constructor() {
    super();
    this.title = 'Charts';
  }

  render() {
    const { title } = this.title;
    return (
      <div className="charts">
        <div className="charts__container">
          <p>{title}</p>
        </div>
      </div>
    );
  }
}

export default Charts;
