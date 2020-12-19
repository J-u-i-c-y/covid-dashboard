import React from 'react';
import PropTypes from 'prop-types';
import './Current.scss';
import GlobalParent from '../GlobalParent/GlobalParent';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

class Current extends GlobalParent {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Current cuntry is here.',
      navItems: [
        ['За последний день', 'За весь период пандемии'],
        ['В абсолютных величинах', 'На 100 тыс. населения'],
      ],
      navCurrentItems: [0, 0],
    };
  }

  render() {
    const { title, containerClassName, navItems, navCurrentItems } = this.state;
    const { country, countries, cbChangeCurrentCountry, globalWord } = this.props;

    return (
      <div className="current">
        <div className={`current__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            navCurrentItems={navCurrentItems}
            toggleNavItem={this.toggleNavItem}
            toggleFullWin={this.toggleContainerClassName}
            idx="currentNav"
            countries={countries}
            hasInput={true}
            cbChangeCurrentCountry={cbChangeCurrentCountry}
          />
          <h4>{title}: {country.country || 'Global'}</h4>
          <div className="current__table">
            <div className="current__row">
              количество случаев заболевания:&nbsp;
              {(country.cases || globalWord.cases || 0).toLocaleString()}
            </div>
            <div className="current__row">
              количество летальных исходов:&nbsp;
              {(country.deaths || globalWord.deaths || 0).toLocaleString()}
            </div>
            <div className="current__row">
              количество выздоровевших:&nbsp;
              {(country.recovered || globalWord.recovered || 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Current.propTypes = {
  country: PropTypes.object,
};

export default Current;
