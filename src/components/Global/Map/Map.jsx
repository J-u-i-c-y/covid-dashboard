import React, { Component } from 'react';
import './Map.scss';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="map">
        <div className="map__container">this is container for map</div>
      </div>
    );
  }
}

export default Map;
