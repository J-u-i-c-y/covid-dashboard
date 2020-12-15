import React, { Component } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Informer from '../Informer/Informer';
import Table from '../Table/Table';
import Map from '../Map/Map';
import Current from '../Current/Current';
import Charts from '../Charts/Charts';
import Covid19DataAPI from '../../services/Covid19DataAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      country: 'Belarus!!!',
      totalDeaths: 0,
    };
    this.covidDataAPI = new Covid19DataAPI();
  }

  componentDidMount() {
    this.covidDataAPI.getGlobalStatistic()
      .then((data) => {
        this.setState({ data });

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
