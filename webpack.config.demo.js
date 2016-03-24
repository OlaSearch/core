var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './index'
  ],
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'olasearch.demo.min.js',
    library: 'OlaSearch',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, './'),
      exclude: /(node_modules|bower_components)/
    }]
  }
}

