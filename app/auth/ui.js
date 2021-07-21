'use strict'

const store = require('./../store')
const tips = require('./../gametips.js')

const onSignUpSuccess = function (response) {
  // console.log('Super')
  $('#status').text('Thank you for signing up', response.user.email)
  // console.log(response)
  $('sign-up').trigger('reset')
  $('#sign-in').show()
  $('#sign-up').hide()
  $('#sign-out').hide()
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
  $('#change-password').show()
  $('#all-games').show()
  $('#create-game').show()
}

const onSignInFailure = function () {
  console.log('Not possible')
  $('#status').text('Sign in failure')
  $('sign-in').trigger('reset')
}

const onSignOutSuccess = function () {
  $('#status').text('You successfully signed out. Hope you will come back!')
  $('#sign-in').show()
  $('#sign-up').show()
  $('#sign-out').hide()
  $('#change-password').hide()
  $('#create-game').hide()
  $('#all-games').hide()
  $('*').css({
    'background-image': '',
    color: 'black',
    'background-size': '100%'
  })
  tips.gameTips()
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
  $('*').css({
    'background-image': '',
    color: 'black',
    'background-size': '100%'
  })
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
  $(`[data-cell-index=${store.boardCell}]`).html(`<p class="move-decoration">${store.move}</p>`) // placing a move on the board

  // check if the game is a tie and display this while updating the score
  if (store.gameMoves === 9) {
    $('#status').text(store.gameStatus)
    store.gameXWins += 0.5
    store.gameOWins += 0.5
  }

  if (!store.gameOnOff) {
    $('#status').text(store.gameStatus)
    // celebration
    // $(`[data-cell-index=${store.boardCell}]`).html(
    //   '<img id="winner-celebration" src="public/images/fireworks01.gif">')
    // $(`[data-cell-index=${store.boardCell}]`).css('background-color', 'green')
    // get a random image number
    const randomImage = Math.floor(Math.random() * 5)

    $(`[data-cell-index=${store.boardCell}]`).css({
      'background-image': `url("public/images/fireworks0${randomImage}.gif")`,
      color: 'red',
      'background-size': '100%'
    })
    // placing a move on the board
  }
  $('.score').html(`
    <p id="x-player" class="score-details" >X Score: ${store.gameXWins}</p>
    <p class="score-details" > &nbsp | &nbsp </p>
    <p id="o-player" class="score-details" >O Score: ${store.gameOWins}</p>
  `)
}

const onBoardMoveFailure = function () {
  $('#status').text('We could not make a board move')
}

// const winFireworks = [
//   'public/images/fireworks01.gif',
//   'public/images/fireworks02.gif',
//   'public/images/fireworks03.gif',
//   'public/images/fireworks04.gif',
//   'public/images/fireworks05.gif'
// ]

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
