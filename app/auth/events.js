'use strict'

// require methods
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const onSignUp = function (event) {
  event.preventDefault()
  // console.log('This is working on events for onSignUp function')
  const form = event.target
  // console.log(form)
  const data = getFormFields(form)
  // console.log(data)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  // console.log('This is working on events for onSignIn function')
  const form = event.target
  // console.log(form)
  const data = getFormFields(form)
  // console.log(data)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = function () {
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  // console.log('This is working on events for onChangePassword function')
  const form = event.target
  // console.log(form)
  const data = getFormFields(form)
  // console.log(data)
  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onCreateGame = function (event) {
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onGetGames = function (event) {
  event.preventDefault()
  api.getGames()
    .then(ui.onGetGamesSuccess)
    .catch(ui.onGetGamesFailure)
}

const onBoardMove = function (event) {
  // console.log('On board move')
  // console.log(event)
  const boardEvent = event.target
  const boardCell = boardEvent.getAttribute('data-cell-index')
  // console.log('Board cell is', boardCell)

  // stops the game and prevents and new board moves
  if (store.gameOnOff === 'Off') {
    return
  }

  if (gameLogic(boardCell)) {
    api.boardMove()
      .then(ui.onBoardMoveSuccess)
      .catch(ui.onBoardMoveFailure)
  }
}

const checkGameProgress = function (move) {
  let valueOfTheMove = 0
  if (move === 'X') {
    valueOfTheMove = 1
  } else {
    valueOfTheMove = -1
  }
  return valueOfTheMove
}

// game Logic

const gameLogic = function (boardCell) {
  store.boardCell = boardCell
  // console.log(store.boardCell)
  if (store.gameProgress[boardCell] !== 0 || !store.gameOnOff) {
    // alert('Cannot do that move')
    // $(`[data-cell-index=${store.boardCell}]`).css('background-color', 'red')
    $('status').text('Cannot do that move')
    return false // return if the move is not possible
  }

  // sudo code
  // logic that combines the starting player with the player next move
  // add the index of starting player from the store.players array to the current move

  // if the move is possible
  store.gameMoves += 1
  if (store.gameMoves % 2 === 0) {
    store.player = 2
    // what is next move?
    // this is the player that does the even moves
    store.move = 'O' // initial  code
    store.move = store.newGameSecondPlayer
    store.gameProgress[boardCell] = checkGameProgress(store.move)
  } else {
    store.player = 1
    // what is the next move ?
    // this is the player that does the odd moves
    store.move = 'X' // initial  code
    store.move = store.newGameFirstPlayer // switch players code
    store.gameProgress[boardCell] = checkGameProgress(store.move)
  }

  const checkGameStatus = checkIfWeHaveAWinner(store.gameProgress)
  console.log(checkGameStatus)
  if (checkGameStatus) {
    return true
  }

  // check if we have a winner
  // row conditions

  console.log(store)
  // console.log(boardEvent)
  // console.log(boardEvent.type())
  // const boardID = boardEvent.lastIndexOf('id', 1)
  // console.log(boardID)
  return true
}

// pass an array and check if there is a winner
const checkIfWeHaveAWinner = function (gameProgress) {
  const checkArray = [0, 0, 0]

  // check if the rows have a winner
  for (let row = 1; row <= 3; row++) {
    const base = 3 * (row - 1)
    for (let a = 0; a < 3; a++) {
      checkArray[a] = gameProgress[base + a]
    }
    if (Math.abs(sumArray(checkArray)) === 3) {
      storeGameUpdate()
      return true
    }
  }

  // check if the columns have a winner
  for (let col = 1; col <= 3; col++) {
    const base = col - 1
    for (let a = 0; a < 3; a++) {
      checkArray[a] = gameProgress[a * 3 + base]
    }
    if (Math.abs(sumArray(checkArray)) === 3) {
      storeGameUpdate()
      return true
    }
  }

  // check first diagonal
  for (let d = 0; d < 3; d++) {
    checkArray[d] = gameProgress[d === 0 ? 0 : Math.pow(2, d + 1)]
  }
  if (Math.abs(sumArray(checkArray)) === 3) {
    storeGameUpdate()
    return true
  }

  // check the next diagonal
  for (let d = 3; d > 0; d--) {
    checkArray[3 - d] = gameProgress[(3 - d) * 3 + d - 1]
  }
  if (Math.abs(sumArray(checkArray)) === 3) {
    storeGameUpdate()
    return true
  }
}

const sumArray = function (array) {
  let sum = 0
  for (let a = 0; a < array.length; a++) {
    sum = sum + array[a]
  }
  return sum
}

const storeGameUpdate = function () {
  store.gameStatus = `Player ${store.move} is the winner`
  store.gameOnOff = !store.gameOnOff
  store[`game${store.move}Wins`] += 1
  store.gamesPlayed += 1 // increase the number of games played
  store.currentPlayer = store.players[store.gamesPlayed % 2] // switch starting player for next game
}

// Exports from events.js
module.exports = {
  onSignUp: onSignUp,
  onSignIn: onSignIn,
  onSignOut: onSignOut,
  onChangePassword: onChangePassword,
  // game related code
  onCreateGame: onCreateGame,
  onGetGames: onGetGames,
  onBoardMove: onBoardMove
}
