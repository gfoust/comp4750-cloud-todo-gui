const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const base = require('./config.base');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    allowedHosts: 'all',
    client: {
      overlay: true,
    },
    compress: true,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    static: [ 
      {
        directory: path.join(__dirname, '../static'),
      }, 
      {
        directory: path.join(__dirname, '../dist'),
      }
    ],
    watchFiles: ['src/**/*'],
  },
  // watch: true,
  watchOptions: {
    ignored: [ 'node_modules', '**/*.spec.ts' ],
    poll: 1000,
  },
});
