import React, { Component } from 'react';

import GameCell from './GameCell.js';
import ticTacToeData from '../TicTacToeData.js';

class GameField extends Component {
  constructor() {
    super()

    this.state = {
      currentPlayer: 'X',
      stepCounter: 0,
      winStatus: false,
      cellData: ticTacToeData, 
    }

    this.cellClicked = this.cellClicked.bind(this)
    this.refreshGame = this.refreshGame.bind(this)
  }

  async cellClicked(cellNum) {
    if(this.state.winStatus) {
      return
    }

    let nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    let activeCell = this.state.cellData.find(cell => cell.cellNum === Number(cellNum));
    activeCell.value = !activeCell.value ? this.state.currentPlayer : activeCell.value;
    let newData = this.state.cellData

    this.setState((prevState) => {
      return {
        stepCounter: prevState.stepCounter + 1,
        cellData: newData,
      }
    })  

    await this.checkWin() 

    if(!this.state.winStatus) {
      this.setState({
        currentPlayer: nextPlayer,
      })   
    } 
  }

  checkWin() {
    const conditions = {
      0: [0, 1, 2],
      1: [3, 4, 5],
      2: [6, 7, 8],
      3: [0, 3, 6],
      4: [1, 4, 7],
      5: [2, 5, 8],
      6: [0, 4, 8],
      7: [2, 4, 6],
    };

    for(let stateWin in conditions) {
      let counter = 0;

      conditions[stateWin].map(winCellNum => {
        let currentCell = this.state.cellData.find(cell => cell.cellNum === winCellNum)

          if (currentCell.value === this.state.currentPlayer) {
            counter += 1
          }   

        })
      if (counter === 3) {
        this.setState({
            winStatus: true,
        })
      } 
    }
  } 

  refreshGame() {
    ticTacToeData.forEach(cell => cell.value = null) 

    this.setState({
      winStatus: false,
      stepCounter: 0,
      currentPlayer: 'X',
      cellData: ticTacToeData
    })
  }

  render() {
    return (
      <div>
        {this.state.winStatus && <h1 className="tic-tac-toe__win-message">{this.state.currentPlayer} WIN!</h1>}
        {(!this.state.winStatus && this.state.stepCounter === 9) && <h1 className="tic-tac-toe__win-message">DROW!</h1>}
        <div className="tic-tac-toe__game-field">
          {this.state.cellData.map( cell => <GameCell  
            key={cell.cellNum} 
            cell={cell}
            callback={this.cellClicked} 
            /> )}
        </div>
        <button className="tic-tac-toe__refresh-button" onClick={this.refreshGame}>Refresh game</button>
      </div>  
    );
  }
}

export default GameField;