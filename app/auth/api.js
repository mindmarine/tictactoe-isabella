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
		data: data,
	})
}

const signIn = function (data) {
	console.log(data)
	return $.ajax({
		url: `${appCurrentLink.apiUrl}/sign-in`,
		method: 'POST',
		data: data,
	})
}

const signOut = function () {
	return $.ajax({
		url: `${appCurrentLink.apiUrl}/sign-out`,
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + store.token,
		},
	})
}

const ChangePassword = function (data) {
	return $.ajax({
		url: `${appCurrentLink.apiUrl}/change-password`,
		method: 'PATCH',
		headers: {
			Authorization: 'Bearer ' + store.token,
		},
		data: data,
	})
}


// Exports from api.js
module.exports = {
	signUp: signUp,
	signIn: signIn,
	signOut: signOut,
	ChangePassword: ChangePassword
}
