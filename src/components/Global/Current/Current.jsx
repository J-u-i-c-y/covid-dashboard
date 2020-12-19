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
    const { country } = this.props;
    return (
      <div className="current">
        <div className={`current__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            navCurrentItems={navCurrentItems}
            toggleNavItem={this.toggleNavItem}
            toggleFullWin={this.toggleContainerClassName}
            idx="currentNav"
            hasInput={true}
          />
          <h4>{title}</h4>
          <p>
            Current country is:&nbsp;
            {country}
          </p>
        </div>
      </div>
    );
  }
}

Current.propTypes = {
  country: PropTypes.string.isRequired,
};

export default Current;
