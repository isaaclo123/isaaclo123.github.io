// webpack config dev

// const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractScss = new ExtractTextPlugin('public/style.css');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname),
    inline: true,
    host: '0.0.0.0',
    port: 8080,
  },
  entry: './src/js/script.js',
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
      /*
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      */
    ],
  },
  plugins: [
    extractScss,
    /*
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    */
    new HtmlWebpackPlugin({
      title: 'Isaac Lo',
      filename: './index.html',
      template: './src/index.template.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: './src/pages/resume/resume.pdf',
        to: './public/resume.pdf',
      },
    ]),
    new CleanWebpackPlugin(['public', 'index.html']),
    new UglifyJsPlugin({}),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    alias: {
      '@': path.resolve('src'),
    },
  },
};
