// webpack config

const path = require('path');
const cssnano = require('cssnano');
const defaultPreset = require('cssnano-preset-default');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GoogleFontsPlugin = require('google-fonts-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AsyncStylesheetWebpackPlugin = require('async-stylesheet-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');

// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const extractScss = new ExtractTextPlugin('public/style.css');
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: loader => [ // eslint-disable-line no-unused-vars
      cssnano({
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      }),
      require('autoprefixer')(), // eslint-disable-line global-require
      require('postcss-preset-env')(), // eslint-disable-line global-require
      require('postcss-flexbugs-fixes')(), // eslint-disable-line global-require
      require('postcss-normalize')(), // eslint-disable-line global-require
    ],
  },
};

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
        test: /\.css$/,
        use: ['style-loader', 'css-loader', postcssLoader],
      },
      {
        test: /\.scss$/,
        use: extractScss.extract({
          fallback: 'style-loader',
          use: [
            'style-loader',
            'css-loader',
            postcssLoader,
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader?limit=10000&mimetype=application/font-woff',
            options: {
              outputPath: 'public/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new ExtractTextPlugin('node_modules/normalize.css/normalize.css'),
    new ExtractTextPlugin('[name].css'),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/,
      cssProcessor: cssnano,
      cssProcessorOptions: defaultPreset({
        discardComments: {
          removeAll: true,
        },
      }),
      canPrint: true,
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
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Anonymous Pro' },
        { family: 'Roboto' },
      ],
      local: true,
      filename: 'public/font/fonts.css',
      path: 'public/font/',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/pages/resume/resume.pdf',
        to: './public/resume.pdf',
      },
    ]),
    new CleanWebpackPlugin(['public', 'index.html']),
    new AsyncStylesheetWebpackPlugin({
      preloadPolyfill: true,
      noscriptFallback: true,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    /*
    new PrerenderSPAPlugin({
      // Index.html is in the root directory.
      staticDir: path.join(__dirname),
      outputDir: path.join(__dirname),
      // indexPath: path.join(__dirname, 'index.html'),
      routes: ['/'],

      // Optional minification.
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },

      renderer: new Renderer({
        // renderAfterTime: 5000, // Wait 5 seconds.
        // headless: false,
      }),
    }),
    */
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
