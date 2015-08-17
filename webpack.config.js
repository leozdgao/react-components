/* eslint es6: false */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'react-components.min.js',
    sourceMapFilename: '[file].map'
  },
  externals: {
    'react': 'React'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
