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
      navCurrentItems: [0, 0],
    };
  }

  render() {
    const { containerClassName, navItems, navCurrentItems } = this.state;
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
          <p>Table</p>
        </div>
      </div>
    );
  }
}

export default Table;
