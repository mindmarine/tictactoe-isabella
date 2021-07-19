'use strict'

// require everywhere
const appCurrentLink = require('./../config')
const store = require('./../store')

const signUp = function (data) {
  // console.log(data)
  // console.log(`This is the current link ${appCurrentLink.apiUrl}`)
  return $.ajax({
    url: `${appCurrentLink.apiUrl}/sign-up`,
    method: 'POST',
    data: data
  })
}

const signIn = function (data) {
  console.log(data)
  return $.ajax({
    url: `${appCurrentLink.apiUrl}/sign-in`,
    method: 'POST',
    data: data
  })
}

const signOut = function () {
  return $.ajax({
    url: `${appCurrentLink.apiUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: `${appCurrentLink.apiUrl}/change-password`,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.token
    },
    data: data
  })
}

// games related code

const createGame = function () {
  // alert('Creating a new game')
  console.log('Creating a new game')
  const startGame = {}
  return $.ajax({
    url: `${appCurrentLink.apiUrl}/games`,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.token
    },
    startGame
  })
}

const getGames = function () {
  console.log('Getting the list of games')
  return $.ajax({
    url: `${appCurrentLink.apiUrl}/games`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

const onBoardMove = function () {
  console.log('Placing a move')
}

// const GetGames = function () {
//   const gamesList = $.ajax({
//     url: `${appCurrentLink.apiUrl}/games`,
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + store.token
//     }
//   })
//   console.log(gamesList)
// }

// Exports from api.js
module.exports = {
  signUp: signUp,
  signIn: signIn,
  signOut: signOut,
  changePassword: changePassword,
  createGame: createGame,
  getGames: getGames,
  onBoardMove: onBoardMove
}
