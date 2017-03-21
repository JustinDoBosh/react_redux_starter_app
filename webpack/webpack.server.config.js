'use strict'

const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const copyWebpackPlugin = require('copy-webpack-plugin')

const PROJECT_ROOT = path.resolve(__dirname, '../')

module.exports = function(version){
  let serverConfig = {
    name: 'server',
    devtool: 'eval',
    target: 'node',
    node: {
      __filename: false,
      __dirname: false
    },
    externals: [nodeExternals()],
    context: path.join(PROJECT_ROOT, 'src/server'),
    entry: ['babel-register', 'babel-polyfill', './server.js'],
    output: {
      path: path.join(PROJECT_ROOT, 'dist'),
      filename: 'server.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PKG_VERSION': JSON.stringify(version)
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: { loader: 'babel-loader',
            options: {
              plugins: [],
              presets: ['es2015', 'stage-0', 'react']
            }
          },
          exclude: [/node_modules/, './dist', './src/client']
        }
      ]
    }
  }

  switch (process.env.NODE_ENV) {
    case 'developement':
      serverConfig.devtool = 'eval'
      break
    
    default:
      serverConfig.devtool = 'cheap-module-source-map'
      break
  }
  return serverConfig
}
