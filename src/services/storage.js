module.exports = {
  get (key) {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key))
    }

    return false
  },
  set (key, value) {
    if ('localStorage' in window) window.localStorage.setItem(key, JSON.stringify(value))
  },
  cookies: {
    set (name, value, days) {
      var expires
      if (typeof value === 'object') value = JSON.stringify(value)
      if (days) {
        let date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = `; expires=${date.toGMTString()}`
      } else expires = ''
      document.cookie = `${name}=${value}${expires}; path=/`
    },
    get (name) {
      var nameEQ = `${name}=`
      var ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    },
    remove (name) {
      this.set(name, '', -1)
    }
  }
}
