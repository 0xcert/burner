module.exports = {
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  rules: {
    'no-empty-source': null,
    'block-no-empty': false,
    'selector-no-vendor-prefix': null,
    'selector-no-qualifying-type': null,
    'property-no-vendor-prefix': null,
    'no-descending-specificity': null,
    'selector-max-compound-selectors': null,
    'selector-class-pattern': '[a-z_]+',
    'selector-max-id': 2,
    'max-nesting-depth': 4
  }
}
