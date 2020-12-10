import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'Hello World',
      hi: 'hi, gays!',
    };
  }

  render() {
    const { hello } = { ...this.state };
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit
            <br />
            <code>src/App.js</code>
            and save to reload.
            <br />
            <span>{hello}</span>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
