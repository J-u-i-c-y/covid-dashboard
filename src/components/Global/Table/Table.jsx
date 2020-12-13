import React, { Component } from 'react';
import './Table.scss';
import ModuleNav from '../../Elements/ModuleNav/ModuleNav';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerClassName: '',
    };
  }

  toggleContainerClassName(param) {
    this.setState({ containerClassName: param ? 'is-open-full' : '' });
  }

  render() {
    const { containerClassName } = this.state;
    return (
      <div className="table">
        <div className={`table__container ${containerClassName}`}>
          <ModuleNav changeFullWin={this.toggleContainerClassName} />
          <p>Table</p>
        </div>
      </div>
    );
  }
}

export default Table;
