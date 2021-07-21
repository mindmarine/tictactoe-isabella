'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// const apiUrl = require('./config')
// console.log(apiUrl)

const authEvents = require('./auth/events.js')
// const gameEvents = require('./game/events.js')

const gameTips = function () {
  const tips = [
    'You will need to sign up/sign in first!<br> <span>7 Steps for a successful TicTacToe career</span>',
    '1) Press on <span>a new game</span> and place your symbol on the board. A good tip is to <span>start in the middle</span> of the board',
    '2) The second player comes next. Plan  and yes let us use a big word <span>strategize your next move</span>',
    '3) Practice! Practice! Practice! is the way for any developer but also for a TicTacToe player',
    '4) ',
    '5) ',
    '6) ',
    '7) ',
    'Have fun! © 2021 github.com/mindmarine <br> Sources: Stephen R Covey google, wikihow'
  ]
  for (let tip = 0; tip < 9; tip++) {
    $(`[data-cell-index=${tip}]`).html(`<p class="tips">${tips[tip]}</p>`)
  }
}

gameTips()

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

// game logic

// create an array in store to facilitate game logic
// if a board cell is not occupied store move. if it is occupied err
// if a move is allowed
// store move
// check for game situations
// did anyone win? Yes/ No Who Won?
// is it the end of the game? Is it a tie?
