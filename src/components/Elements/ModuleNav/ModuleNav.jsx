import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModuleNav.scss';
import sprite from '../../../assets/images/sprite.svg';

class ModuleNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: true,
    };
  }

  changeFullWin() {
    const { isFull } = this.state;
    this.setState({ isFull: !isFull });
    const { changeFullWin } = this.props;
    changeFullWin(isFull);
  }

  render() {
    const { isFull } = this.state;
    const fullIcon = isFull ? '#open-full' : '#close-full';
    return (
      <div className="module-nav">
        <div className="module-nav__menu">
          <div className="module-nav__menu-icon">
            <svg width="24" height="24">
              <use href={`${sprite}#menu`} />
            </svg>
          </div>
          <div className="module-nav__menu-dropdown">
            <div className="module-nav__menu-item">propdown item</div>
          </div>
        </div>
        <div className="module-nav__full">
          <button type="button" onClick={this.changeFullWin.bind(this)}>
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
  changeFullWin: PropTypes.func.isRequired,
};

export default ModuleNav;
