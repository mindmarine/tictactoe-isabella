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
  store.boardCell = boardCell
  // console.log(store.boardCell)
  if (store.gameProgress[store.boardCell]) {
    alert('Move taken')
    $(`[data-cell-index=${store.boardCell}]`).css('background-color', 'red')
  } else {
    if (store.gameMoves === undefined) {
      store.gameMoves = 1
    } else store.gameMoves += 1

    if (store.gameMoves % 2 === 0) {
      store.player = 2
      store.move = 'O'
      store.gameProgress[store.boardCell] = -1
    } else {
      store.player = 1
      store.move = 'X'
      store.gameProgress[store.boardCell] = 1
    }
  }
  console.log(store)
  // console.log(boardEvent)
  // console.log(boardEvent.type())
  // const boardID = boardEvent.lastIndexOf('id', 1)
  // console.log(boardID)
  api.boardMove()
    .then(ui.onBoardMoveSuccess)
    .catch(ui.onBoardMoveFailure)
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
