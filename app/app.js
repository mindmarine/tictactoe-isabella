'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const apiUrl = require('./config')
// console.log(apiUrl)

const authEvents = require('./auth/events.js')
// const gameEvents = require('./game/events.js')

$(() => {
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

/*

The following code binds click event to all <a> elements which have data-spinner attribute equal to true:

$("a[data-spinner='true']").click(function() {
    // Do more Action
});
*/
