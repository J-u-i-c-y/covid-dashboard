import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModuleNav.scss';
import sprite from '../../../assets/images/sprite.svg';

class ModuleNav extends Component {
  constructor(props) {
    super(props);
    const { currentItem } = this.props;
    this.state = {
      isFull: true,
      menuIsOpen: false,
      menuCurrentItem: currentItem,
    };
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

  toggleMenu() {
    const { menuIsOpen } = this.state;
    this.setState({ menuIsOpen: !menuIsOpen });
  }

  toggleCurrentMenuItem(id) {
    const { menuIsOpen, menuCurrentItem } = this.state;
    this.setState({
      menuIsOpen: !menuIsOpen,
      menuCurrentItem: id,
    });
    const { toggleNavItem } = this.props;
    toggleNavItem(menuCurrentItem);
  }

  render() {
    const { isFull, menuIsOpen, menuCurrentItem } = this.state;
    const fullIcon = isFull ? '#open-full' : '#close-full';
    const menuWrapperClassName = menuIsOpen ? 'is-open' : '';
    const { navItems } = this.props;
    const menuListContent = navItems.map((el, id) => (
      <li
        className={`module-nav__menu-item ${
          id === menuCurrentItem ? 'is-current' : ''
        }`}
        key={id.toString()}
      >
        <button
          type="button"
          onClick={this.toggleCurrentMenuItem.bind(this, id)}
        >
          {el}
        </button>
      </li>
    ));
    return (
      <div className="module-nav">
        <div className={`module-nav__menu ${menuWrapperClassName}`}>
          <div className="module-nav__menu-icon">
            <button type="button" onClick={this.toggleMenu.bind(this)}>
              <svg width="24" height="24">
                <use href={`${sprite}#menu`} />
              </svg>
            </button>
          </div>
          <div className="module-nav__menu-dropdown">
            <ul className="module-nav__menu-list">{menuListContent}</ul>
          </div>
        </div>
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
  navItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleNavItem: PropTypes.func.isRequired,
  currentItem: PropTypes.number,
};

ModuleNav.defaultProps = {
  currentItem: 0,
};

export default ModuleNav;
