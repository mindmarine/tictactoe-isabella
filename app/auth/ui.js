'use strict'

const store = require('./../store')

const onSignUpSuccess = function (response) {
  // console.log('Super')
  $('#status').text('Thank you for signing up', response.user.email)
  // console.log(response)
  $('sign-up').trigger('reset')
  $('#sign-in').hide()
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
const onCreateGameSuccess = function () {
  $('#status').text('A new game was started'
  )
}

const onCreateGameFailure = function () {
  $('#status').text('We could not create a new game. Please try again')
}

const onGetGamesSuccess = function (response) {
  console.log(response)
}

const onGetGamesFailure = function (response) {
  $('#status').text('We could not get the lis tof games. Please try again')
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
  onGetGamesFailure: onGetGamesFailure
}
