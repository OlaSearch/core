var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [    
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {      
      'olasearch': path.join(__dirname, './src')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, ''),
      exclude: /(node_modules|bower_components)/
    },
    { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  }
};
