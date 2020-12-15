import React, { Component } from 'react';
import './App.scss';
import Header from '../Global/Header/Header';
import Informer from '../Global/Informer/Informer';
import Table from '../Global/Table/Table';
import Map from '../Global/Map/Map';
import Current from '../Global/Current/Current';
import Charts from '../Global/Charts/Charts';
import Covid19DataAPI from '../../services/Covid19DataAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'Belarus!!!',
      totalConfirmed: 0,
      totalDeaths: 0,
      totalRecovered: 0,
    };
    this.covidDataAPI = new Covid19DataAPI();
  }

  componentDidMount() {
    this.covidDataAPI.getGlobalStatistic().then((data) => {
      // eslint-disable-next-line no-console
      console.log(data);
      this.setState({
        totalDeaths: data.TotalDeaths,
        totalConfirmed: data.TotalConfirmed,
        totalRecovered: data.TotalRecovered,
      });
    });
  }

  render() {
    const { totalConfirmed, totalDeaths, totalRecovered, country } = this.state;

    return (
      <div className="app">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <div className={('app__col', 'app__col--first')}>
            <Informer
              totalConfirmed={totalConfirmed}
              totalDeaths={totalDeaths}
              totalRecovered={totalRecovered}
            />
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
