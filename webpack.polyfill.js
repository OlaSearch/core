var path = require('path')
var webpack = require('webpack')
var startYear = 2016
var currentYear = new Date().getFullYear()
var version = process.env.VERSION || 'latest'
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          /**
           * Safari bug: Cannot declare a const twice
           */
          safari10: true
        }
      })
    ]
  },
  entry: [
    './src/polyfill'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `olasearch.polyfill.min.js`,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  module: {
    rules: [{
      test: /\.js?/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/,
      include: [
        path.join(__dirname, './'),
        path.join(__dirname, './src'),
      ]
    }]
  }
}
