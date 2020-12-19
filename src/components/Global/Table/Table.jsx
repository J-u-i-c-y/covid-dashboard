import React from 'react';
import GlobalParent from '../GlobalParent/GlobalParent';
import './Table.scss';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';
import keys from '../../../constants/keys';

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

  componentDidUpdate(prevProps, prevState) {
    const { country } = this.props;
    if (prevProps.country !== country) {
      const elem = document.querySelector(`#${country.countryInfo.iso3}`);
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    const { containerClassName, navItems, navCurrentItems } = this.state;
    const { countries, country } = this.props;

    const getCurrentDataOnKeys = (item, key) => {
      let res = 0
      if (navCurrentItems[0] === 1) {
        res = navCurrentItems[1] === 0 ? item[key] : item[keys[key][0]] / 10
      } else {
        res = navCurrentItems[1] === 0 ? item[keys[key][1]] : (item[keys[key][1]] / item.population) * 100000
      }
      return res.toLocaleString()
    }

    const getCountryRowClassName = (nameCountry) => country.country === nameCountry ? 'is-current' : null;

    const getTableContent = countries => {
      const keySort = navCurrentItems[1] !== 1 ? 'cases' : 'casesPerOneMillion'
      return countries.sort((a, b) => b[keySort] - a[keySort]).map(item => (
        <tr
          id={item.countryInfo.iso3}
          className={getCountryRowClassName(item.country)}
          onClick={this.clickByCountry.bind(this, item)}
          key={item.country}
        >
          <td>
            <span className="table__flag if-open-full">
              <img src={item.countryInfo.flag} alt="" />
            </span>
            {item.country}
          </td>
          <td>{getCurrentDataOnKeys(item, 'cases')}</td>
          <td>{getCurrentDataOnKeys(item, 'deaths')}</td>
          <td>{getCurrentDataOnKeys(item, 'recovered')}</td>
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
