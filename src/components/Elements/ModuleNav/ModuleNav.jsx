import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModuleNav.scss';
import sprite from '../../../assets/images/sprite.svg';
import VKey from '../../../services/Vkey/Vkey';

class ModuleNav extends Component {
  constructor(props) {
    super(props);
    const { navCurrentItems } = this.props;
    this.state = {
      isFull: true,
      menuIsOpen: false,
      nuvCurrentItems: navCurrentItems,
      openInputDropdown: false,
      searchCountryString: '',
    };
    this.handlerInput = this.handlerInput.bind(this);
    this.getCurrentListCountries = this.getCurrentListCountries.bind(this);
  }

  componentDidMount() {
    const { navItems, hasInput } = this.props;
    navItems.forEach((group, groupId) => {
      if (groupId < group.length - 1) group.push('separator');
    });
    if (hasInput) {
      this.vkey = new VKey('#country-input');
      this.vkey.init();
    }
  }

  handlerInput(event) {
    const { openInputDropdown } = this.state;
    const searchCountryString = event.target.value;
    this.setState({
      searchCountryString: searchCountryString.toLowerCase(),
    });
    if (searchCountryString === '') {
      this.toggleInputDropdown(false);
    } else if (!openInputDropdown) {
      this.toggleInputDropdown(true);
    }
  }

  handlerInputKeyDown(event) {
    if (event.key === 'Enter') {
      const currentList = this.getCurrentListCountries();
      if (currentList && currentList.length > 0)
        this.changeCurrentCountry(currentList[0]);
    }
  }

  getCurrentListCountries() {
    const { searchCountryString } = this.state;
    const { countries } = this.props;
    return countries.filter((el) =>
      el.country.toLowerCase().includes(searchCountryString)
    );
  }

  toggleCurrentMenuItem(id, groupId) {
    const { menuIsOpen, nuvCurrentItems } = this.state;
    nuvCurrentItems[groupId] = id;
    this.setState({
      menuIsOpen: !menuIsOpen,
      nuvCurrentItems,
    });
    const { toggleNavItem } = this.props;
    toggleNavItem(nuvCurrentItems);
  }

  closeMenu(e) {
    const { idx } = this.props;
    if (!e.target.closest(`#${idx}`)) {
      this.setState({ menuIsOpen: false });
      window.removeEventListener('click', this.closeMenu.bind(this));
    }
  }

  toggleMenu() {
    const { menuIsOpen } = this.state;
    this.setState({ menuIsOpen: !menuIsOpen });
    if (!menuIsOpen) {
      window.addEventListener('click', this.closeMenu.bind(this));
    } else {
      window.removeEventListener('click', this.closeMenu.bind(this));
    }
  }

  toggleFullWin() {
    const { isFull } = this.state;
    this.setState({
      isFull: !isFull,
      menuIsOpen: false,
    });
    const { toggleFullWin } = this.props;
    toggleFullWin(isFull);
  }

  toggleInputDropdown(data) {
    this.setState({
      openInputDropdown: data,
    });
    if (!data) {
      this.setState({
        searchCountryString: '',
      });
      this.vkey.close();
    }
  }

  changeCurrentCountry(country) {
    this.toggleInputDropdown(false);
    const { cbChangeCurrentCountry } = this.props;
    cbChangeCurrentCountry(country);
  }

  render() {
    const {
      isFull,
      menuIsOpen,
      nuvCurrentItems,
      openInputDropdown,
      searchCountryString,
    } = this.state;
    const fullIcon = isFull ? '#open-full' : '#close-full';
    const menuWrapperClassName = menuIsOpen ? 'is-open' : '';
    const inputDropdownClassName = openInputDropdown ? 'is-open' : '';
    const { navItems, idx, hasInput } = this.props;
    const menuItem = (el, id, groupId) => {
      return (
        <li
          className={`module-nav__menu-item ${
            id === nuvCurrentItems[groupId] ? 'is-current' : ''
          }`}
          key={`${id + 1}-${groupId + 1}`.toString()}
        >
          <button
            type="button"
            onClick={this.toggleCurrentMenuItem.bind(this, id, groupId)}
          >
            {el}
          </button>
        </li>
      );
    };
    const separatorItem = (id, groupId) => {
      return (
        <li
          className={
            ('module-nav__menu-item', 'module-nav__menu-item--separator')
          }
          key={`${id + 1}-${groupId + 1}`.toString()}
        />
      );
    };
    const createOneListInnerContent = (el, id, groupId) => {
      return el === 'separator'
        ? separatorItem(id, groupId)
        : menuItem(el, id, groupId);
    };
    const menuOneList = (groupe, groupId) =>
      groupe.map((el, id) => createOneListInnerContent(el, id, groupId));
    const menuNavListsContent = navItems.map((groupe, groupId) => (
      <ul
        className="module-nav__menu-list"
        key={`unic-menu-list-${groupId + 1}`}
      >
        {menuOneList(groupe, groupId)}
      </ul>
    ));
    const getListOfCountries = () => {
      const currentList = this.getCurrentListCountries();
      let result;
      if (currentList.length > 0) {
        result = currentList.map((item) => (
          <button
            type="button"
            className="module-nav__input-dropdown_item"
            onClick={this.changeCurrentCountry.bind(this, item)}
            key={item.country}
          >
            {item.country}
          </button>
        ));
      } else result = <div>No countryes found.</div>;
      return result;
    };
    return (
      <div className="module-nav" id={idx}>
        <div className={`module-nav__menu ${menuWrapperClassName}`}>
          <div className="module-nav__menu-icon">
            <button type="button" onClick={this.toggleMenu.bind(this)}>
              <svg width="24" height="24">
                <use href={`${sprite}#menu`} />
              </svg>
            </button>
          </div>
          <div className="module-nav__menu-dropdown">{menuNavListsContent}</div>
        </div>
        {hasInput && (
          <div className="module-nav__input-wrap">
            <input
              type="test"
              id="country-input"
              placeholder="Search country"
              value={searchCountryString}
              onChange={this.handlerInput}
              onFocus={this.handlerInput}
              onKeyDown={this.handlerInputKeyDown}
            />
            <div
              className={`module-nav__input-dropdown ${inputDropdownClassName}`}
            >
              <div className="module-nav__input-dropdown_inner">
                {getListOfCountries()}
              </div>
            </div>
          </div>
        )}

        <div className="module-nav__full">
          <button type="button" onClick={this.toggleFullWin.bind(this)}>
            <svg width="24" height="24">
              <use href={sprite + fullIcon} />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

ModuleNav.propTypes = {
  toggleFullWin: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  toggleNavItem: PropTypes.func.isRequired,
  navCurrentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  idx: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object),
  cbChangeCurrentCountry: PropTypes.func,
  hasInput: PropTypes.bool,
};

ModuleNav.defaultProps = {
  hasInput: false,
  cbChangeCurrentCountry: () => {},
  countries: [],
};

export default ModuleNav;
