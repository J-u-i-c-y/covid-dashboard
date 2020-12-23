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
          {`${name}: ${count.toLocaleString()}`}
        </div>
      );
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
          <h4>{`Current country is: ${country.country.country || 'Global'}`}</h4>
          <div className="current__table">
            {currentTableRows.map((row) => getCurrentRow(row.name, row.key))}
          </div>
        </div>
      </div>
    );
  }
}

export default Current;
