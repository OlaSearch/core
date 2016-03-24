var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './olasearch.config'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'config.min.js',
    publicPath: '/dist/',
    library: '__OLA_CONFIG__',
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
        warnings: true
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, ''),
      exclude: /(node_modules|bower_components)/
    }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}

