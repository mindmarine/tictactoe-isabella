'use strict'

const store = require('./../store')

const onSignUpSuccess = function (response) {
	// console.log('Super')
	$('#message').text('Thank you for signing up', response.user.email)
	// console.log(response)
	$('sign-up').trigger('reset')
}

const onSignUpFailure = function () {
	console.log('Not possible')
	$('#message').text('Sign up failure')
	$('sign-up').trigger('reset')
}

const onSignInSuccess = function (response) {
	// console.log('Super')
	$('#message').text('Thank you for signing in', response.user.email)
	// console.log(response)
    store.token = response.user.token
	$('sign-in').trigger('reset')
}

const onSignInFailure = function () {
	console.log('Not possible')
	$('#message').text('Sign in failure')
	$('sign-in').trigger('reset')
}

const onSignOutSuccess = function () {
	$('#message').text('Successfully Signed Out')
}

const onSignOutFailure = function () {
	$('#message').text('Sign out failure')
}


module.exports = {
	onSignUpSuccess: onSignUpSuccess,
	onSignUpFailure: onSignUpFailure,
	onSignInSuccess: onSignInSuccess,
	onSignInFailure: onSignInFailure,
	onSignOutSuccess: onSignOutSuccess,
	onSignOutFailure: onSignOutFailure
}