module.exports = {
  get (key) {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key))
    }

    return false
  },
  set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  cookies: {
    set (name, value, days){
      if (typeof value === 'object') value = JSON.stringify(value)
      if (days) {
        let date = new Date()
        date.setTime(date.getTime()+(days*24*60*60*1000))
        var expires = "; expires="+date.toGMTString()
      }
      else var expires = ""
      document.cookie = name+"="+value+expires+"; path=/"
    },
    get (name) {
      var nameEQ = name + "="
      var ca = document.cookie.split(';')
      for (let i=0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0)==' ') c = c.substring(1,c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
      }
      console.log('called')
      return null
    },
    remove (name){
      this.set(name,"",-1)
    }
  }
}
