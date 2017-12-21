module.exports = {
    extends: 'standard',
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    env: {
      browser: true,
    },
    plugins: [
        'html'
     ],
    'rules': {
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
   }
};