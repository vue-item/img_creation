// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'vue',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    globals: {
        'Vue': true
    },
    // add your custom rules here
    'rules': {
        'no-undef': 0,
        'eol-last': 0, // 末尾空行
        'no-new': 0, // new Object
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}