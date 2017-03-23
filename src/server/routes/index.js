
import React from 'react'
import { renderToString } from 'react-dom/server'

import configureStore from '../../client/store/configure_store'
import { syncHistoryWithStore } from 'react-router-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import routes from '../../client/routes/routes'
import { Provider } from 'react-redux'

export default function handleRender(req, res) {


  // Standard Client side rendering in Dev mode w/ no Hot Module Replacemnt
  // -- ** Hot Module replacement has undesired behavior for my workflow **
  if(process.env.NODE_ENV === 'development'){
    res.send(renderFullPage('', {}))

    // Server Side rendering in prod --- provides faster rendering
  } else {

    const memoryHistory = createMemoryHistory(req.path)
    let store = configureStore(memoryHistory)
    const history = syncHistoryWithStore(memoryHistory, store)

    match({history, routes, location: req.url}, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

        store = configureStore(memoryHistory, store.getState())

        const content = renderToString(
          <Provider store={ store }>
            <RouterContext {...renderProps} />
          </Provider>
        )
        res.status(200).send(renderFullPage(content, store.getState()))
      } else {
        res.status(404).send('Not found')
      }
    })
  }


}

function renderFullPage(html, initialState) {
  const VERSION = process.env.NODE_ENV === 'development' ? 'dev' : String(require('json-loader!../../../package.json').version)
  const vendorPath = process.env.NODE_ENV === 'development' ? '': `<script src="vendor.bundle-${VERSION}.js"></script>`

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=11">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" media="all" />
        <title>Starter App</title>
        <style>
          html { font-size: 16px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 200;}
          html, body, #root { margin: 0; }
          body { background-color: #f4f4f4;}
        </style>
      </head>
      <body>
        <div id="root">${ html }</div>
        <script>
          window.__initialState__ = ${JSON.stringify(initialState)}
        </script>
        ${vendorPath}
        <script src="client-${VERSION}.js"></script>
      </body>
    </html>`

}