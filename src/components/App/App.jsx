import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Informer from '../Informer/Informer';
import Table from '../Table/Table';
import Map from '../Map/Map';
import Current from '../Current/Current';
import Charts from '../Charts/Charts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5598034,
      country: 'Belarus!!!',
    };
  }

  componentDidMount() {
    fetch('https://api.covid19api.com/')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data });
        // eslint-disable-next-line no-console
        console.log(this.state);
      });
  }

  render() {
    const { count, country } = this.state;

    return (
      <div className="app">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <div className={('app__col', 'app__col--first')}>
            <Informer count={count} />
            <Table />
          </div>
          <div className={('app__col', 'app__col--second')}>
            <Map />
          </div>
          <div className={('app__col', 'app__col--third')}>
            <Current country={country} />
            <Charts />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
