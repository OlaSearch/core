// setup file
require('raf').polyfill(global)
import { JSDOM } from 'jsdom'
const babelRegister = require('babel-register')

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });


function babelModules (whitelist) {
  whitelist = whitelist || []
  babelRegister({
    ignore: function (filename) {
      var ignore = false

      if (filename.match('/node_modules/')) {
        ignore = true

        for (var i = 0, len = whitelist.length; i < len; i++) {
          var moduleName = whitelist[i]

          if (filename.match('/' + moduleName + '/')) {
            ignore = false
            break
          }
        }
      }

      return ignore
    }
  })
}
/* Register rambda */
// babelModules(['rambda'])

global.dom = new JSDOM('<!doctype html><html><body></body></html>',{
  url: 'http://localhost'
})
global.document = dom.window.document
global.window = dom.window
global.navigator = global.window.navigator

global.window.localStorage = {
    getItem: function (key) {
        return this[key];
    },
    setItem: function (key, value) {
        this[key] = value;
    }
}

global.window.sessionStorage = {
    getItem: function (key) {
        return this[key];
    },
    setItem: function (key, value) {
        this[key] = value;
    }
}

global.window.devToolsExtension = () => {
  return (next) => (reducer, initialState, enhancer) => {
    return next(fn(reducer), initialState, enhancer)
  }

  function fn(reducer) {
    return (state, action) => reducer(state, action)
  }
}