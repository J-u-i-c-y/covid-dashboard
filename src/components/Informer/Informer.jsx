import React, { Component } from 'react';
import './Informer.scss';

class Informer extends Component {

  render() {
    return (
      <div className="informer">
        <div className="informer__container">
          {this.props.count}
        </div>
      </div>
    );
  }
}

export default Informer;
