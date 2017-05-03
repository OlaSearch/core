import { JSDOM } from 'jsdom'

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

global.window.devToolsExtension = () => {
  return (next) => (reducer, initialState, enhancer) => {
    return next(fn(reducer), initialState, enhancer)
  }

  function fn(reducer) {
    return (state, action) => reducer(state, action)
  }
}