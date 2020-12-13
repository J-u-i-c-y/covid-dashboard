import React from 'react';
import './Charts.scss';
import GlobalParent from '../GlobalParent/GlobalParent';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

class Charts extends GlobalParent {
  constructor() {
    super();
    this.state = {
      title: 'Charts',
      navItems: [
        ['За последний день', 'За весь период пандемии'],
        ['В абсолютных величинах', 'На 100 тыс. населения'],
      ],
      navCurrentItems: [0, 0],
    };
  }

  render() {
    const { title, containerClassName, navItems, navCurrentItems } = this.state;
    return (
      <div className="charts">
        <div className={`charts__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            navCurrentItems={navCurrentItems}
            toggleNavItem={this.toggleNavItem}
            toggleFullWin={this.toggleContainerClassName}
            idx="chartNav"
          />
          <p>{title}</p>
        </div>
      </div>
    );
  }
}

export default Charts;
