// const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractScss = new ExtractTextPlugin('dist/styles.css');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      use: extractScss.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    }],
  },
  plugins: [
    extractScss,
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    */
    new CleanWebpackPlugin(['dist']),
  ],
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src', 'js'),
      pages: path.resolve(__dirname, 'src', 'js', 'pages'),
    },
  },
};
