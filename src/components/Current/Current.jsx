import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Current.scss';

class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Charts',
    };
  }

  render() {
    const { title } = this.state;
    const { country } = this.props;
    return (
      <div className="current">
        <div className="current__container">
          <h4>{title}</h4>
          <p>
            Current country is:&nbsp;
            {country}
          </p>
        </div>
      </div>
    );
  }
}

Current.propTypes = {
  country: PropTypes.string.isRequired,
};

export default Current;
