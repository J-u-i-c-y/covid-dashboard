import React, { Component } from 'react';
import './Table.scss';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerClassName: '',
      navItems: [
        ['За последний день', 'За весь период пандемии'],
        ['В абсолютных величинах', 'На 100 тыс. населения'],
      ],
      navCurrentItems: [0, 0],
    };
    this.toggleContainerClassName = this.toggleContainerClassName.bind(this);
    this.toggleNavItem = this.toggleNavItem.bind(this);
  }

  toggleNavItem(data) {
    this.setState({ navCurrentItems: data });
    // eslint-disable-next-line no-console
    console.log('current nav-item is: ', data);
  }

  toggleContainerClassName(param) {
    this.setState({ containerClassName: param ? 'is-open-full' : '' });
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
          />
          <p>Table</p>
        </div>
      </div>
    );
  }
}

export default Table;
