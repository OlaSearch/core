var path = require('path')
var { version } = require('./package.json')

module.exports = {
  title: `Ola Search UI Components ${version}`,
  showUsage: true,
  highlightTheme: 'material',
  sections: [
    {
      name: 'Fields',
      components: 'src/components/Fields/*.js'
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js?/,
          use: ['babel-loader'],
          exclude: /node_modules/,
          include: [
            path.join(__dirname, './'),
            path.join(__dirname, './../src')
          ]
        }
      ]
    }
  },
  components: 'src/components/Fields/**/*.js'
}
