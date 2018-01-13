// const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractScss = new ExtractTextPlugin('public/style.css');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname),
    inline: true,
    host: '0.0.0.0',
    port: 8080,
  },
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'public/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public/',
            },
          },
        ],
      },
      {
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
      },
    ],
  },
  plugins: [
    extractScss,
    new HtmlWebpackPlugin({
      title: 'Isaac Lo',
      filename: './index.html',
      template: './src/index.template.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/pages/resume/resume.pdf',
        to: './public/resume.pdf',
      },
    ]),
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    */
    new CleanWebpackPlugin(['public', 'index.html']),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    alias: {
      lib: path.resolve(__dirname, 'src', 'js'),
      pages: path.resolve(__dirname, 'src', 'pages'),
      sass: path.resolve(__dirname, 'src', 'sass'),
      npm: path.resolve(__dirname, 'node_modules'),
    },
  },
};
