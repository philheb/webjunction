import Validator from 'validator'

module.exports = function validateRegisterInput(data) {
  let errors = {}

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Name most be between 2 and 50 characters'
  }
  return {
    errors,
    isValid: errors,
  }
}
