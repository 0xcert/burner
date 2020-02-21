// eslint-disable-next-line
import { required, integer, min_value } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('required', {
  ...required,
  message: 'The {_field_} field is required.'
})

extend('integer', {
  ...integer,
  message: 'Please enter a valid integer number.'
})

// eslint-disable-next-line
extend('min_value', {
  // eslint-disable-next-line
  ...min_value,
  params: ['min'],
  message: 'Value of the {_field_} field must be at least {min}.'
})

extend('balance', {
  params: ['balance'],
  validate: (value, { balance }) => {
    if (Number(value) > parseInt(balance) / 10 ** 18) {
      return false
    }
    return true
  },
  message: 'That is more tokens than you own.'
})
