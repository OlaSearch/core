/**
 * sessionStorage polyfill
 */
function Storage (type) {
  function setData (data) {
    data = JSON.stringify(data)
    window.name = data
  }
  function clearData () {
    window.name = ''
  }
  function getData () {
    var data = window.name
    return data ? JSON.parse(data) : {}
  }

  // initialise if there's already data
  var data = getData()

  return {
    length: 0,
    clear () {
      data = {}
      this.length = 0
      clearData()
    },
    getItem (key) {
      return data[key] === undefined ? null : data[key]
    },
    key (i) {
      // not perfect, but works
      var ctr = 0
      for (var k in data) {
        if (ctr === i) return k
        else ctr++
      }
      return null
    },
    removeItem (key) {
      delete data[key]
      this.length--
      setData(data)
    },
    setItem (key, value) {
      data[key] = value + '' // forces the value to a string
      this.length++
      setData(data)
    }
  }
}

module.exports =
  typeof window.sessionStorage !== 'undefined'
    ? window.sessionStorage
    : new Storage()
