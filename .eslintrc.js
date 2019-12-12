module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: ['plugin:vue/essential'],
  rules: {
		'no-console':'off'
	},
	"globals":{
		"document": true,
		"localStorage": true,
		"window": true
	},
  parserOptions: {
    parser: 'babel-eslint'
  }
}
