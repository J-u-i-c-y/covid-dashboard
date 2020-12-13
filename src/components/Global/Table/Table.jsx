import React, { Component } from 'react';
import './Table.scss';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerClassName: '',
      navItems: ['Show params 1', 'Show params 2', 'Show params 3'],
      navCurrentItem: 0,
    };
    this.toggleContainerClassName = this.toggleContainerClassName.bind(this);
    this.toggleNavItem = this.toggleNavItem.bind(this);
  }

  toggleNavItem(id) {
    this.setState({ navCurrentItem: id });
    // eslint-disable-next-line no-console
    console.log('current nav-item is: ', id);
  }

  toggleContainerClassName(param) {
    this.setState({ containerClassName: param ? 'is-open-full' : '' });
  }

  render() {
    const { containerClassName, navItems, navCurrentItem } = this.state;
    return (
      <div className="table">
        <div className={`table__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            currentItem={navCurrentItem}
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
