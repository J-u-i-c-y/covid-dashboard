import React from 'react';
import PropTypes from 'prop-types';
import './Informer.scss';

const Informer = (props) => {
  const { totalConfirmed, totalDeaths, totalRecovered } = props;
  const date = new Date();
  return (
    <div className="informer">
      <div className="informer__container">
        <div className="informer__row informer__row--center">
          <span>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</span>
        </div>
        <div className="informer__row">
          Total confirmed:&nbsp;
          <span>{totalConfirmed.toLocaleString()}</span>
        </div>
        <div className="informer__row">
          Total deaths:&nbsp;
          <span>{totalDeaths.toLocaleString()}</span>
        </div>
        <div className="informer__row">
          Total recovered:&nbsp;
          <span>{totalRecovered.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

Informer.propTypes = {
  totalConfirmed: PropTypes.number.isRequired,
  totalDeaths: PropTypes.number.isRequired,
  totalRecovered: PropTypes.number.isRequired,
};

export default Informer;
