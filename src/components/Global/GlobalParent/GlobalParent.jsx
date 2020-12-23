// import React, { Component } from 'react';
import { Component } from 'react';
// import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

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
  }

  toggleContainerClassName(param) {
    this.setState({ containerClassName: param ? 'is-open-full' : '' });
  }
}

export default GlobalParent;
