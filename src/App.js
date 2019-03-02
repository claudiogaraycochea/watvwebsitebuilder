import React, { Component } from 'react';
import './App.css';
import Main from './components/main/Main';
import { Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;
