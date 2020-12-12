import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Informer.scss';

class Informer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { count } = this.props;
    return (
      <div className="informer">
        <div className="informer__container">{count}</div>
      </div>
    );
  }
}

Informer.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Informer;
