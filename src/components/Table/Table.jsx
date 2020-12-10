import React, { Component } from 'react';
import './Table.scss';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
    };
  }

  render() {
    return (
      <div className="table">
        <div className="table__container">
          <p>Table</p>
        </div>
      </div>
    );
  }
}

export default Table;
