import React from 'react';
import GlobalParent from '../GlobalParent/GlobalParent';
import './Table.scss';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

class Table extends GlobalParent {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        ['За последний день', 'За весь период пандемии'],
        ['В абсолютных величинах', 'На 100 тыс. населения'],
      ],
      navCurrentItems: [1, 0],
    };
  }

  clickByCountry(country) {
    const { toggleCurrentCountry } = this.props;
    toggleCurrentCountry(country)
  }

  render() {
    const { containerClassName, navItems, navCurrentItems } = this.state;
    const { countries } = this.props;

    const getCurrentCases = item => {
      let res = 0
      if (navCurrentItems[0] === 1) {
        res = navCurrentItems[1] === 0 ? item.cases : item.casesPerOneMillion / 10
      } else {
        res = navCurrentItems[1] === 0 ? item.todayCases : (item.todayCases / item.population) * 100000
      }
      return res.toLocaleString()
    }

    const getCurrentDeaths = item => {
      let res = 0
      if (navCurrentItems[0] === 1) {
        res = navCurrentItems[1] === 0 ? item.deaths : item.deathsPerOneMillion / 10
      } else {
        res = navCurrentItems[1] === 0 ? item.todayDeaths : (item.todayDeaths / item.population) * 100000
      }
      return res.toLocaleString()
    }

    const getCurrentRecovered = item => {
      let res = 0
      if (navCurrentItems[0] === 1) {
        res = navCurrentItems[1] === 0 ? item.recovered : item.recoveredPerOneMillion / 10
      } else {
        res = navCurrentItems[1] === 0 ? item.todayRecovered : (item.todayRecovered / item.population) * 100000
      }
      return res.toLocaleString()
    }

    const getTableContent = countries => {
      const keySort = navCurrentItems[1] !== 1 ? 'cases' : 'casesPerOneMillion'
      return countries.sort((a, b) => b[keySort] - a[keySort]).map(item => (
        <tr key={item.country} onClick={this.clickByCountry.bind(this, item.country)}>
          <td>
            <span className="table__flag if-open-full">
              <img src={item.countryInfo.flag} alt="" />
            </span>
            {item.country}
          </td>
          <td>{getCurrentCases(item)}</td>
          <td>{getCurrentDeaths(item)}</td>
          <td>{getCurrentRecovered(item)}</td>
        </tr>
      ));
    };

    return (
      <div className="table">
        <div className={`table__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            navCurrentItems={navCurrentItems}
            toggleNavItem={this.toggleNavItem}
            toggleFullWin={this.toggleContainerClassName}
            idx="tableNav"
          />
          <div className="table__wrapper">
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Cases</th>
                  <th>Deaths</th>
                  <th>Recovered</th>
                </tr>
              </thead>
              <tbody className="table__body">{getTableContent(countries)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
