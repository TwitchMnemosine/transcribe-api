const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req)
  console.log(errors)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = validate;