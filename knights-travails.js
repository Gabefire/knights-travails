class CheckPiece {
  constructor(row, column, visited = false, legalMoves = []) {
    this.row = row;
    this.column = column;
    this.visited = visited;
    this.legalMoves = legalMoves;
    this.previous = null;
  }
}

const moveOffsets = [
  [1, 2],
  [1, -2],
  [2, 1],
  [2, -1],
  [-1, 2],
  [-1, -2],
  [-2, 1],
  [-2, -1],
];

const isOnBoard = (row, col, boardSize = 8) => {
  if (row > boardSize - 1 || row < 0) {
    return false;
  }
  if (col > boardSize - 1 || col < 0) {
    return false;
  }
  return true;
};

const KnightsTravails = (knightPos, knightTar, boardSize = 8) => {
  const gameGraph = [];
  const queue = [];
  for (let row = 0; row < boardSize; row++) {
    let gameRow = [];
    for (let col = 0; col < boardSize; col++) {
      if (knightPos[0] === row && knightPos[1] === col) {
        const knightPiece = new CheckPiece(row, col, true);
        gameRow.push(knightPiece);
        queue.push(knightPiece);
        continue;
      }
      const checkPiece = new CheckPiece(row, col);
      gameRow.push(checkPiece);
    }
    gameGraph.push(gameRow);
  }
  while (queue.length > 0) {
    let firstElement = queue.shift();
    if (
      firstElement.row === knightTar[0] &&
      firstElement.column === knightTar[1]
    ) {
      return firstElement;
    }
    for (let i = 0; i < moveOffsets.length; i++) {
      let row = firstElement.row + moveOffsets[i][0];
      let col = firstElement.column + moveOffsets[i][1];
      if (!isOnBoard(row, col, boardSize)) {
        continue;
      }
      let matchingCheckPiece = gameGraph[row][col];
      if (!matchingCheckPiece.visited) {
        matchingCheckPiece.visited = true;
        matchingCheckPiece.previous = firstElement;
        queue.push(matchingCheckPiece);
      }
    }
  }
};

let checkPiece = KnightsTravails([3, 3], [4, 3]);
let answer = [];
while (checkPiece !== null) {
  answer.unshift([checkPiece.row, checkPiece.column]);
  checkPiece = checkPiece.previous;
}
console.log(`=> You made it in ${answer.length - 1} moves!  Here's your path:`);
for (let i = 0; i < answer.length; i++) {
  console.log(answer[i]);
}
