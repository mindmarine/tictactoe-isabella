'use strict'

const store = require('./../store')

const onSignUpSuccess = function (response) {
  // console.log('Super')
  $('#status').text('Thank you for signing up', response.user.email)
  // console.log(response)
  $('sign-up').trigger('reset')
  $('#sign-in').show()
  $('#sign-up').hide()
  $('#sign-out').show()
}

const onSignUpFailure = function () {
  console.log('Not possible')
  $('#status').text('Sign up failure')
  $('sign-up').trigger('reset')
}

const onSignInSuccess = function (response) {
  // console.log('Super')
  $('#status').text('Thank you for signing in', response.user.email)
  // console.log(response)
  store.token = response.user.token
  store.gamesPlayed = 0
  store.players = ['X', 'O']
  store.gameXWins = 0
  store.gameOWins = 0
  store.newGameStartingPlayerToggle = 0
  $('sign-in').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out').show()
  $('#create-game').show()
}

const onSignInFailure = function () {
  console.log('Not possible')
  $('#status').text('Sign in failure')
  $('sign-in').trigger('reset')
}

const onSignOutSuccess = function () {
  $('#status').text('Successfully Signed Out')
  $('#sign-in').show()
  $('#sign-up').show()
  $('#sign-out').hide()
  $('#create-game').hide()
}

const onSignOutFailure = function () {
  $('#status').text('Sign out failure')
}

const onChangePasswordSuccess = function () {
  $('#status').text('You have changed your password. Please remember the new password')
}

const onChangePasswordFailure = function () {
  $('#status').text('Password change was unsuccessful. Please try again')
}

// game related code
const onCreateGameSuccess = function (response) {
  $('#status').text('A new game was started')
  $('.game-cell').text('')
  // $('.board').show()
  // console.log(response)
  // console.log(response.game._id)
  store.gameId = response.game._id
  store.gameProgress = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  store.boardCell = ''
  store.gameMoves = 0
  store.gameStatus = 'Tie'
  store.gameOnOff = true
  store.newGameFirstPlayerToggle = store.gamesPlayed % 2
  store.newGameSecondPlayerToggle = 1 - (store.gamesPlayed % 2)
  store.newGameFirstPlayer = store.players[store.newGameFirstPlayerToggle]
  store.newGameSecondPlayer = store.players[store.newGameSecondPlayerToggle]
  console.log(store)
}

const onCreateGameFailure = function () {
  $('#status').text('We could not create a new game. Please try again')
}

const onGetGamesSuccess = function (response) {
  console.log(response)
}

const onGetGamesFailure = function (response) {
  $('#status').text('We could not get the list of games. Please try again')
}

const onBoardMoveSuccess = function () {
  // console.log('In onBoardMoveSuccess')
  // console.log(`Player ${store.move} move is ${store.boardCell}`)
  // console.log(store.boardCell)
  $(`[data-cell-index=${store.boardCell}]`).html(`<p class="move-decoration">${store.move}</p>`) // currently working

  // check if the game is a tie and display this while updating the score
  if (store.gameMoves === 9) {
    $('#status').text(store.gameStatus)
    store.gameXWins += 0.5
    store.gameOWins += 0.5
  }

  if (!store.gameOnOff) {
    $('#status').text(store.gameStatus)
  }
  $('.score').html(`
    <ul>
      <li id="x-player">X Score: ${store.gameXWins}</li>
      <li> --- </li>
      <li id="o-player">O Score: ${store.gameOWins}</li>
    </ul>
  `)
}

const onBoardMoveFailure = function () {
  $('#status').text('We could not make a board move')
}

module.exports = {
  // auth
  onSignUpSuccess: onSignUpSuccess,
  onSignUpFailure: onSignUpFailure,
  onSignInSuccess: onSignInSuccess,
  onSignInFailure: onSignInFailure,
  onSignOutSuccess: onSignOutSuccess,
  onSignOutFailure: onSignOutFailure,
  onChangePasswordSuccess: onChangePasswordSuccess,
  onChangePasswordFailure: onChangePasswordFailure,
  // game
  onCreateGameSuccess: onCreateGameSuccess,
  onCreateGameFailure: onCreateGameFailure,
  onGetGamesSuccess: onGetGamesSuccess,
  onGetGamesFailure: onGetGamesFailure,
  onBoardMoveSuccess: onBoardMoveSuccess,
  onBoardMoveFailure: onBoardMoveFailure
}
