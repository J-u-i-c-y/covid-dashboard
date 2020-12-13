import React, { Component } from 'react';
import rsLogo from '../../../assets/images/rs-logo.svg';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appTitle: 'Hello World',
    };
  }

  render() {
    const { appTitle } = this.state;
    return (
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <img
              src={rsLogo}
              className="header__logo-img"
              alt="RS School logotype"
            />
          </div>
          <div className="header__title">{appTitle}</div>
        </div>
      </header>
    );
  }
}

export default Header;
