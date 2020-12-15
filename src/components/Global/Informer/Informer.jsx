import React from 'react';
import PropTypes from 'prop-types';
import './Informer.scss';

const Informer = (props) => {
  const { count } = props;
  return (
    <div className="informer">
      <div className="informer__container">{count}</div>
    </div>
  );
};

Informer.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Informer;
