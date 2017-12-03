import { getKey } from './../utilities'
/**
 * Use try {} catch (e) {} for localStorage because of users browser privacy settings
 */
/**
 * A cookie cache to prevent accessing document.cookie
 * Accessing document.cookie adds 0.5ms to ola.rehydrate
 */
var cookieCache = document.cookie
/* Default export */
module.exports = {
  get (key, namespace) {
    let _key = getKey(key, namespace)
    try {
      let value = window.localStorage.getItem(_key)
      if (value) {
        return JSON.parse(value)
      }
    } catch (err) {
      console.warn(err)
      return undefined
    }
  },
  set (key, value, namespace) {
    try {
      if ('localStorage' in window) {
        window.localStorage.setItem(
          getKey(key, namespace),
          JSON.stringify(value)
        )
      }
    } catch (err) {
      console.warn(err)
      return undefined
    }
  },
  cookies: {
    set (name, value, days, namespace) {
      var expires
      /* Always encode URI for objects */
      if (typeof value === 'object') {
        value = encodeURIComponent(JSON.stringify(value))
      }
      if (days) {
        let date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = `; expires=${date.toGMTString()}`
      } else expires = ''
      try {
        document.cookie = cookieCache = `${getKey(
          name,
          namespace
        )}=${value}${expires}; path=/`
      } catch (err) {
        console.warn(err)
      }
    },
    get (name, namespace) {
      try {
        var nameEQ = `${getKey(name, namespace)}=`
        var ca = cookieCache.split(';')
        for (let i = 0, len = ca.length; i < len; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') c = c.substring(1, c.length)
          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length) || null
          }
        }
        return null
      } catch (err) {
        console.warn(err)
        return null
      }
    },
    remove (name, namespace) {
      this.set(getKey(name, namespace), '', -1)
    }
  }
}
