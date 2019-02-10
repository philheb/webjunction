const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  // EMAIL
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  // PASSWORDS
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  return { isValid: isEmpty(errors), errors }
}
