import React from 'react';
import './Current.scss';
import GlobalParent from '../GlobalParent/GlobalParent';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';
import keys from '../../../constants/keys';

class Current extends GlobalParent {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        ['For the last day', 'Over the entire period'],
        ['In absolute terms', 'Per 100 thousand population'],
      ],
      navCurrentItems: [1, 0],
      currentTableRows: [
        { name: 'Total cases', key: 'cases' },
        { name: 'Total deaths', key: 'deaths' },
        { name: 'Total recovered', key: 'recovered' },
      ],
      containerClassName: '',
    };
  }

  render() {
    const {
      containerClassName,
      navItems,
      navCurrentItems,
      currentTableRows,
    } = this.state;
    const { country } = this.props;

    const getCurrentRow = (name, key) => {
      const item = country.country;
      let count = 0;
      if (navCurrentItems[0] === 1) {
        count = navCurrentItems[1] === 0 ? item[key] : item[keys[key][0]] / 10;
      } else {
        count =
          navCurrentItems[1] === 0
            ? item[keys[key][1]]
            : (item[keys[key][1]] / item.population) * 100000;
      }
      count = count === undefined ? 0 : count;
      return (
        <div className="current__row" key={`curr-tab-r-${key}`}>
          {name}
          :&nbsp;
          <span>{count.toLocaleString()}</span>
        </div>
      );
    };

    const getPopulationRow = () => {
      let result = '';
      if (country.country.population) {
        result = (
          <div className="current__row">
            Population :&nbsp;
            <span>{country.country.population.toLocaleString()}</span>
          </div>
        );
      }
      return result;
    };

    const getCountryFlagRow = () => {
      let result = '';
      if (country.country.countryInfo) {
        result = (
          <div className="current__row">
            <img src={country.country.countryInfo.flag} alt="" />
          </div>
        );
      }
      return result;
    };

    return (
      <div className="current">
        <div className={`current__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            navCurrentItems={navCurrentItems}
            toggleNavItem={this.toggleNavItem}
            toggleFullWin={this.toggleContainerClassName}
            idx="currentNav"
          />
          <h4>{`Current data for ${country.country.country || 'World'}:`}</h4>
          <div className="current__container-subtitle">
            {`(${navItems[0][navCurrentItems[0]].toLowerCase()} / ${navItems[1][
              navCurrentItems[1]
            ].toLowerCase()})`}
          </div>
          <div className="current__table">
            {currentTableRows.map((row) => getCurrentRow(row.name, row.key))}
            {getPopulationRow()}
            {getCountryFlagRow()}
          </div>
        </div>
      </div>
    );
  }
}

export default Current;
