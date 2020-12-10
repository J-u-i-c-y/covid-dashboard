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
      hello: 'Hello World',
      data: {},
      allHuman: 5598034,
      country: 'Belarus!!!'
    };
    this.getApiData()
  }

  getApiData() {
    fetch('https://api.covid19api.com/')
      .then(response => response.json())
      .then(data => {
        Object.assign(this.state.data, data)
        console.log(this.state)
      })
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <div className="app__col app__col--first">
            <Informer count={this.state.allHuman} />
            <Table />
          </div>
          <div className="app__col app__col--second">
            <Map />
          </div>
          <div className="app__col app__col--third">
            <Current country={this.state.country} />
            <Charts />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
