import React, { Component } from 'react';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

class GlobalParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerClassName: '',
      navItems: [
        ['Params 1 group 1', 'Params 2 group 1'],
        ['Params 1 group 2', 'Params 2 group 2'],
      ],
      navCurrentItems: [0, 0],
    };
    this.toggleContainerClassName = this.toggleContainerClassName.bind(this);
    this.toggleNavItem = this.toggleNavItem.bind(this);
  }

  toggleNavItem(data) {
    this.setState({ navCurrentItems: data });
    // eslint-disable-next-line no-console
    // console.log('current nav-item is: ', data);
  }

  toggleContainerClassName(param) {
    this.setState({ containerClassName: param ? 'is-open-full' : '' });
  }

  render() {
    const { containerClassName, navItems, navCurrentItems } = this.state;
    return (
      <div className="module">
        <div className={`module__container ${containerClassName}`}>
          <ModuleNav
            navItems={navItems}
            navCurrentItems={navCurrentItems}
            toggleNavItem={this.toggleNavItem}
            toggleFullWin={this.toggleContainerClassName}
          />
          <p>Module</p>
        </div>
      </div>
    );
  }
}

export default GlobalParent;
