import expect from 'expect'
import storage from './../../src/services/storage'

function removeStorage () {
  window.localStorage = null
}

function restoreStorage () {
  window.localStorage = {
      getItem: function (key) {
          return this[key];
      },
      setItem: function (key, value) {
          this[key] = value;
      }
  }
}

describe('Storage', () => {
  it('set item in storage', () => {
    storage.set('key', 'hello')
    expect(storage.get('key')).toEqual('hello')
  })

  describe('catch errors', () => {
    beforeEach(removeStorage)
    afterEach(restoreStorage)
    it('throws an error if localstorage doesnt exist when getting', () => {
      const spy = expect.spyOn(console, 'warn')
      storage.get('key')
      spy.destroy()
      expect(spy.calls.length).toBe(1)
    })

    it('throws an error if localstorage doesnt exist when setting', () => {
      const spy = expect.spyOn(console, 'warn')
      storage.set('key')
      spy.destroy()
      expect(spy.calls.length).toBe(1)
    })
  })
})