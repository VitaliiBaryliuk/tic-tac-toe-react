import React, { Component } from 'react';

export default class GameCell extends Component {

  render() {
    return (
      <div 
        onClick={() => this.props.callback(this.props.cell.cellNum)}
        className="tic-tac-toe__cell" 
      >
        {this.props.cell.value} 
      </div>
    );
  }
}
