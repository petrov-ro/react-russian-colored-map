const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotenvPlug = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/dist',
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        }
      },
      {
        test: /\.jsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader", options: {url: false}},
          {loader: "postcss-loader"},
          {loader: "sass-loader"}
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {loader: 'url-loader'}
        ],
      },
    ]
  },
  resolve: {
    alias: {
      constants: path.resolve(__dirname, 'src/constants/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      types: path.resolve(__dirname, 'src/types/'),
    },
    extensions: [".mjs", ".ts", ".tsx", ".js", ".jsx", ".scss"]
  },
  plugins: [
    new DotenvPlug({
      path: './.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new MiniCssExtractPlugin({filename: "styles.css"}),
  ]
};
