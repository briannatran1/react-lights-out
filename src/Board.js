import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { cloneDeep } from "lodash";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // creates array-of-arrays of true/false values
    for (let x = 0; x < nrows; x++) {
      const createdRow = [];

      for (let y = 0; y < ncols; y++) {
        // push t or f into created row
        createdRow.push(startTilesState(chanceLightStartsOn) ? true : false);
      }

      initialBoard.push(createdRow);
    }

    return initialBoard;
  }

  /** randomizes t/f tile state */

  function startTilesState(chanceLightStartsOn) {
    return chanceLightStartsOn > Math.random();
  }

  // checks the board in state to determine whether the player has won.
  function hasWon() {
    return board.every(row => !(row.includes(true)));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = cloneDeep(oldBoard);

      // TODO: in the copy, flip this cell and the cells around it
      const neighborTiles = [[x, y][x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
      neighborTiles.map((coord) => flipCell(coord[0], coord[1], boardCopy));

      // {
      //   if (coord[0] >= 0 && coord[0] < ncols && coord[1] >= 0 && coord[1] < nrows) {
      //   boardCopy[coord[1]][coord[0]] = !boardCopy[coord[1]][coord[0]];
      // } })

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  return (
    <div className="lights-out-board">
      {
        board.map((row, idx) =>
          row.map(col =>
            <Cell idx={idx}
              flipCellsAroundMe={flipCellsAround}
              isLit={col} />
          ))
      }



    </div>
  );

  // TODO
}

export default Board;
