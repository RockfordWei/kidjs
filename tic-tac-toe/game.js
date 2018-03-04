// global variables
// - chessboard: a set of all available slots
// - playerO: moves of the human player
// - playerX: moves of the bot player
// - lock: a control to avoid human move while bot is thinking
var chessboard, playerO, playerX, lock;

// reset a new game
function reset() {
  chessboard = new Set();
  for(i = 0; i < 9; i++) {
    chessboard.add(i);
    place(i, "");
  }
  playerO = new Set();
  playerX = new Set();
  lock = false;
  setState("YOUR TURN");
}

// show a message
function setState(status) {
  document.getElementById("STATUS").innerHTML = "<B>" + status + "</B>";
}

// general function of place a chess
// - id: the location on the chessboard
// - what: the chess to place.
// "o" for human player, "x" for bot, and "z" for clear the slot
function place(id, what) {
  var cellId = "CELL" + id;
  document.getElementById(cellId).innerText = what;
}

// check if a player is winning, will return true if won.
function check(player) {
  // check three rows
  if (player.has(0) && player.has(1) && player.has(2)) return true;
  if (player.has(3) && player.has(4) && player.has(5)) return true;
  if (player.has(6) && player.has(7) && player.has(8)) return true;

  // check three columns
  if (player.has(0) && player.has(3) && player.has(6)) return true;
  if (player.has(1) && player.has(4) && player.has(7)) return true;
  if (player.has(2) && player.has(5) && player.has(8)) return true;

  // check two slashes
  if (player.has(0) && player.has(4) && player.has(8)) return true;
  if (player.has(2) && player.has(4) && player.has(6)) return true;
  return false;
}

// a bot's move
function move(id) {
  playerX.add(id);
  chessboard.delete(id);
  place(id, "X");
  if (check(playerX)) {
    setState("YOU LOSE");
    chessboard.clear();
  } else if (chessboard.size < 1) {
    setState("GAME OVER");
  } else {
    setState("YOUR TURN");
  }
  lock = false;
}

// the bot player is trying hard to choose the next move.
function think() {
  var placables = Array.from(chessboard);
  var id = placables[Math.floor(Math.random() * placables.length)];
  move(id);
}

// human player is making a move
// - id: the slot id, i.e., the chessboard location.
function play(id) {
  if (chessboard.size < 1 || playerO.has(id) || playerX.has(id) || lock) {
    return ;
  }
  playerO.add(id);
  chessboard.delete(id);
  place(id, "O");
  if (check(playerO)) {
    setState("YOU WIN");
    chessboard.clear();
    return ;
  } else if (chessboard.size < 1) {
    setState("GAME OVER");
    return ;
  }
  setState("THINKING ...");
  lock = true;
  setTimeout(think, 2000);
}
