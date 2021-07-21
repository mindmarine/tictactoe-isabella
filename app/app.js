'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const apiUrl = require('./config')
// console.log(apiUrl)

const authEvents = require('./auth/events.js')
const tips = require('./gametips.js')
// const gameEvents = require('./game/events.js')

$(() => {
  tips.gameTips()
  $('#status').text('SEI JuneBugs First Project Presentations')
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#change-password').on('submit', authEvents.onChangePassword)
  // game related calls
  $('#create-game').on('click', authEvents.onCreateGame)
  $('#get-games').on('click', authEvents.onGetGames)
  // $('.row').on('click', authEvents.onBoardMove)
  $('.board-row > *').on('click', authEvents.onBoardMove)
})

// game logic

// create an array in store to facilitate game logic
// if a board cell is not occupied store move. if it is occupied err
// if a move is allowed
// store move
// check for game situations
// did anyone win? Yes/ No Who Won?
// is it the end of the game? Is it a tie?
