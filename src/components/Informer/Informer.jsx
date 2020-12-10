import React, { Component } from 'react';
import './Informer.scss';

class Informer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
    };
  }

  render() {
    return (
      <div className="informer">
        <div className="informer__container">
          {this.state.count}
        </div>
      </div>
    );
  }
}

export default Informer;
