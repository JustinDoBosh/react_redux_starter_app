'use strict'

const path = require('path')
const webpack = require('webpack')

const PROJECT_ROOT = path.resolve(__dirname, '../')

module.exports = function(version){
  let clientConfig = {
    name: `client.${ version }`,
    context: path.join(PROJECT_ROOT, 'src/client'),
    devtool: 'eval',
    target: 'web',
    entry: {
      client: []
    },
    output:{
      path: path.join(PROJECT_ROOT, 'dist/public'),
      filename: `client-${ version }.js`,
      publicPath: ''
    },
    plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PKG_VERSION': JSON.stringify(version)
    }) 
     
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [],
              presets: ['es2015', 'stage-0', 'react']
            }
          },
          exclude: [/node_modules/, './dist', './src/server'],
        },
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=100000&mimetype=application/font-woff'
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=100000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=100000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=100000&mimetype=image/svg+xml'
        },
        {
          test: /\.(ico)$/,
          use: "static-loader"
        }
      ]
    }
  }

  switch(process.env.NODE_ENV) {

    case 'development':
      clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      )
      clientConfig.entry.client.push('webpack-hot-middleware/client?reload=true')
      clientConfig.entry.client.push('./client.js')
      break
    
    default:
      clientConfig.devtool = 'cheap-module-source-map'
      clientConfig.plugins.push(
        new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: `vendor.bundle-${ version }.js`}),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          mangle: true
        })
      )
      clientConfig.entry.client.push('./client.js')
      clientConfig.entry.vendor = [
      'babel-polyfill',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'isomorphic-fetch'
    ]
    break
  }
  return clientConfig
}
