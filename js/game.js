var gBoard = [];
("use strict");
var gLevel = {
  SIZE: 4,
  MINES: 2,
};
var gGame = {
  isOn: false,
  shownCount: 0, //////cells are opend
  markedCount: 0,
  secsPassed: 0,
};

const MINE = "🧨";
const BLOCK = "block";

function oninit() {
  // console.log("hi");
  // var cellClass
  buildBoard();
  setMinesNegsCount(2, 1, gBoard);
  
  renderBoard(gBoard);
  
}

function buildBoard() {
  var size = gLevel.SIZE; ////// גודל הלוח
  const board = createMat(size, size);

  for (var i = 0; i < board.length; i++) {
    gBoard[i] = [];

    for (var j = 0; j < board.length; j++) {
      gBoard[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        
      };
      // gBoard[i][j].isShown = true;
    }
  }
  
  gBoard[1][2].isMine = true;
  gBoard[2][2].isMine = true;

  return board;
}

function renderBoard(board) {
  var size = gLevel.SIZE;
  var strHTML = "<table><tbody>";
  for (var i = 0; i < size; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < size; j++) {
      const cell = board[i][j];
      // const className = `cell-${i}-${j}`
      var cellClass = getClassName({ i: i, j: j });
      // console.log(className);
      // if (cell.type === MINE) cellClass += " 🧨";
      var cellContent = ''
      if (cell.isShown){
        if (cell.isMine) cellContent = '🧨'
        
        else if (cell.minesAroundCount) cellContent = cell.minesAroundCount
            
        
      }
      // console.log(cellContent);
      // console.log(cellClass);

      strHTML += `<td class="${cellClass}" onclick="onCellClicked(this,${i},${j})">${cellContent}</td>`;
    }

    strHTML += "</tr>";
  }
  strHTML += `</tbody></table>`;
  // console.log(strHTML);

  const elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

function getClassName(location) {
  const cellClass = `cell-${location.i}-${location.j}`;
  return cellClass;
}
// console.log(getClassName);
/// 2 1
function setMinesNegsCount(posI, posJ, board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var currCell = board[i][j];
      currCell.minesAroundCount = getMinesCount({ i: i, j: j });

    }
  }

  // var posI = board[i]
  // var posJ = gBoard[j]
}
// console.log(board);

function getMinesCount(pos) {
  var counter = 0

  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue;

    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j > gBoard.length - 1) continue;

      var currCell = gBoard[i][j];
      // console.log(currCell);
      if (currCell.isMine) {
        counter ++
      }
    }
  }
  return counter
}
////// count boomb negi

onCellClicked();
function onCellClicked(elCell, i, j) {
  var cell = gBoard[i][j]
  cell.isShown = true
  console.log(cell);
  renderBoard(gBoard)
  // var paint =document.querySelector(td)
  // console.log(i, j);

  // console.table(gBoard);
}
function onCellMarcked(elCell) {
  ///// on right click
}
function checkGameOver() {}
function expandShown(board, elCell) {}
