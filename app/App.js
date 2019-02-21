import React, { Component } from 'react';
import './App.css';
import './App.scss';
import TicTacToe from './tic-tac-toe/TicTacToe.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Tic-Tac-Toe</h1>
        <TicTacToe />
      </div>
    );
  }
}

export default App;
