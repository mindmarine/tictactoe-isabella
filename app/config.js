let apiUrl

/* original 
const apiUrls = {
  production: '<replace-with-heroku-url>',
  development: 'http://localhost:4741'
}
*/

/* hint
production: 'https://tic-tac-toe-api-production.herokuapp.com',
development: 'https://tic-tac-toe-api-development.herokuapp.com'
*/

const apiUrls = {
	production: 'https://tic-tac-toe-api-production.herokuapp.com',
	development: 'https://tic-tac-toe-api-development.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
