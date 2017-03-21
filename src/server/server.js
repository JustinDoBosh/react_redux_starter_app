import bodyParser from 'body-parser'
import express from 'express'
import Promise from 'bluebird'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'

import session from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import handleRender from './routes/index'
import config from './config'
import jwt from 'jsonwebtoken'
import kafka from 'no-kafka'
import moment from 'moment'
import _ from 'lodash'
import path from 'path'

const port = process.env.PORT || 8080

//mongoose.Promise = Promise

//initalize mongodb connection
//mongoose.connect(config.mongoURL);

let app = express()
let server = http.createServer(app)

var io = require('socket.io')(server);

app.set('superSecret', config.secret);
app.use(cookieParser('covetedshinyredstapler'))
app.use(bodyParser.json({limit: '1mb'}))

if(process.env.NODE_ENV === 'development'){
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../../webpack/webpack.client.config.js')('dev')
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}))
  app.use(webpackHotMiddleware(compiler))

  //colorized requests
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

// Disable Caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache')
  next()
})

const staticPath = path.join(__dirname, '/public')

app.use(express.static(staticPath))
app.use(handleRender)


server.listen(port, ()=> console.log(`Server is listening on port: ${server.address().port}...`))
