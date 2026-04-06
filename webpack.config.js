const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  devServer: {
    static: {
      directory: __dirname,
    },
    host: '0.0.0.0',
    port: 8080,
  },
  entry: './src/js/script.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'public/bundle.js',
    assetModuleFilename: 'public/[name].[contenthash][ext][query]',
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        include: path.resolve(__dirname, 'src/pages'),
        use: {
          loader: 'html-loader',
          options: {
            esModule: false,
            sources: false,
            minimize: false,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ['import', 'slash-div'],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?.*)?$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'public/style.css',
    }),
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/pages/resume/resume.pdf',
          to: './public/resume.pdf',
        },
      ],
    }),
  ],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
