import React, { Component } from 'react';

import './Node.css';
/// F, G, and H are heurisitc variables for the aStar algorithm.
export default class Node extends Component {
  render() {
    const {
      col,
      // eslint-disable-next-line
      g,
      // eslint-disable-next-line
      h,
      // eslint-disable-next-line
      f,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
        ? 'node-start'
        : isWall
          ? 'node-wall'
          : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
