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
    '<span class="tip-number">1.</span> Press on <span>a new game</span> and place your symbol on the board. A good tip is to <span>start in the middle</span> of the board',
    '<span class="tip-number">2.</span> The second player comes next. Plan  and yes let us use a big word <span>strategize your next move</span>',
    '<span class="tip-number">3.</span> Practice! Practice! Practice! is the way for any developer but also for a TicTacToe player',
    '<span class="tip-number">4.</span> One strategy is to try to take up three corners. This is <span>one of the best ways to win</span>',
    '<span class="tip-number">5.</span> Some people say it is best to <span>start by taking one of the corners</span>',
    '<span class="tip-number">6.</span> Remember to go slow and steady like when you are coding. <span> Always make moves based on strategy</span>',
    '<span class="tip-number">7.</span> Even <span>if you go second you have a slim chance to win</span>. If your opponent knows the game your best chance is to force a tie.',
    '<span>Have fun</span> <br> Sources: Stephen R Covey, google, wikihow  <br> © 2021 github.com/mindmarine'
  ]
  for (let tip = 0; tip < 9; tip++) {
    $(`[data-cell-index=${tip}]`).html(`<p class="tips">${tips[tip]}</p>`)
  }
}

$(() => {
  gameTips()
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
