/**
 * Use try {} catch (e) {} for localStorage because of users browser privacy settings
 */
module.exports = {
  get (key, namespace) {
    let _key = createstorageKey(key, namespace)
    try {
      if (window.localStorage.getItem(_key)) {
        return JSON.parse(window.localStorage.getItem(_key))
      }
    } catch (err) {
      console.warn(err)
      return undefined
    }
    return false
  },
  set (key, value, namespace) {
    try {
      if ('localStorage' in window) window.localStorage.setItem(createstorageKey(key, namespace), JSON.stringify(value))
    } catch (err) {
      console.warn(err)
      return undefined
    }
  },
  cookies: {
    set (name, value, days, namespace) {
      var expires
      if (typeof value === 'object') value = JSON.stringify(value)
      if (days) {
        let date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = `; expires=${date.toGMTString()}`
      } else expires = ''
      try {
        document.cookie = `${createstorageKey(name, namespace)}=${value}${expires}; path=/`
      } catch (err) {
        console.warn(err)
      }
    },
    get (name, namespace) {
      try {
        var nameEQ = `${createstorageKey(name, namespace)}=`
        var ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') c = c.substring(1, c.length)
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        }
        return null
      } catch (err) {
        console.warn(err)
        return null
      }
    },
    remove (name, namespace) {
      this.set(createstorageKey(name, namespace), '', -1)
    }
  }
}

function createstorageKey (key, namespace) {
  return namespace ? `${namespace}_${key}` : key
}
