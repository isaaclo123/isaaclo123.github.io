// webpack config dev

// const webpack = require('webpack');
const path = require('path');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractScss = new ExtractTextPlugin('public/style.css');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
    loaders: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
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
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        // use: ['style-loader', 'css-loader'],
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
    // extractScss,
    new ExtractTextPlugin('public/styles.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
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
      /*
      {
        from: './node_modules/font-awesome/css/font-awesome.min.css',
        to: './public/font-awesome.min.css',
      },
      */
    ]),
    new CleanWebpackPlugin(['public', 'index.html']),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          drop_console: true,
        },
        ie8: true,
        safari10: true,
      },
    }),
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
