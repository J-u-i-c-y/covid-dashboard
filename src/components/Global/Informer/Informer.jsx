import React from 'react';
import PropTypes from 'prop-types';
import './Informer.scss';

const Informer = (props) => {
  const { totalConfirmed, totalDeaths, totalRecovered } = props;
  return (
    <div className="informer">
      <div className="informer__container">
        <div>
          totalConfirmed:&nbsp;
          {totalConfirmed}
        </div>
        <div>
          totalDeaths:&nbsp;
          {totalDeaths}
        </div>
        <div>
          totalRecovered:&nbsp;
          {totalRecovered}
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
