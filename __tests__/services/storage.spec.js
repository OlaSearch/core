import expect from 'expect'
import storage from './../../src/services/storage'

describe('Storage', () => {
  it('set item in storage', () => {
    storage.set('key', 'hello')
    expect(storage.get('key')).toEqual('hello')
  })

  describe('LocalStorage: catch errors', () => {
    it('throws an error if localstorage doesnt exist when getting', () => {
      const spy = jest.spyOn(console, 'warn')
      storage.get('key')
      expect(spy).not.toHaveBeenCalled()
    })

    it('throws an error if localstorage doesnt exist when setting', () => {
      const spy = jest.spyOn(console, 'warn')
      storage.set('key')
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('Cookies', () => {
    it('saves a cookies for 2 days', () => {
      storage.cookies.set('key', 'hello', 2)
      expect(storage.cookies.get('key')).toEqual('hello')
    })

    it('saves a cookies for the session', () => {
      storage.cookies.set('key_session', 'hello')
      expect(storage.cookies.get('key_session')).toEqual('hello')
    })

    it('saves an object in cookie', () => {
      let obj = { name: 'Foo'}
      storage.cookies.set('key', obj)
      expect(decodeURIComponent(storage.cookies.get('key'))).toEqual(JSON.stringify(obj))
    })

    it('returns null if not found', () => {
      expect(storage.cookies.get('key_not_exists')).toEqual(null)
    })

    it('removes from storage', () => {
      storage.cookies.remove('key')
      expect(storage.cookies.get('key')).toEqual(null)
    })
  })
})