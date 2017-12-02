import * as urlSync from './../../src/services/urlSync'
import expect from 'expect'

const QUERY = {
  q:'hello'
}
const BASE_URL = 'http://localhost/'
const CONFIG = {
  history: 'pushState'
}

describe('urlSync', () => {
  it('should have a default history character', () => {
    expect(urlSync.character).toExist()
  })

  describe('pushState', () => {
    beforeEach(() => {
      global.window.location.href = BASE_URL
    })
    it('should pushState', () => {
      urlSync.pushState(QUERY, 'pushState')
      expect(global.window.location.href).toEqual(`${BASE_URL}?q=hello`)
    })

    it('should replaceState', () => {
      urlSync.replaceState(QUERY, 'pushState')
      expect(global.window.location.href).toEqual(`${BASE_URL}?q=hello`)
    })

    it('should fallback to hash based history', () => {
      expect(urlSync.getHistoryCharacter('hash')).toEqual('#/?')
    })
  })

  it('should build url query based on QueryState', () => {
    let url = urlSync.buildQueryString(QUERY)
    expect(url).toEqual('q=hello')
  })


  describe('parseQueryString', () => {
    beforeEach(() => {
      global.window.location.href = BASE_URL + '?q=hello'
    })

    it('should parse `q`', () => {
      let output = urlSync.parseQueryString(QUERY, CONFIG)
      expect(output.q).toEqual('hello')
    })
  })
})