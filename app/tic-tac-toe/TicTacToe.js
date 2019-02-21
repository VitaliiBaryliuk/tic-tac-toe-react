import React, { Component } from 'react';

import GameField from './GameField.js';

class TicTacToe extends Component {
  render() {
    return (
      <div className="tic-tac-toe">
        <GameField />
      </div>
    );
  }
}

export default TicTacToe;
