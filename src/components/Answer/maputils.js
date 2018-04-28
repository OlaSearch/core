export default {
  callbacks: [],
  appended: false,
  load (params, win, doc, callback) {
    this.window = win || window
    this.document = doc || document
    const index = this.callbacks.push(callback)
    if (this.window.google && this.window.google.maps) {
      setTimeout(this.fireCallbacks.bind(this))
    } else {
      if (!this.appended) {
        this.window.mapsCallback = this.mapsCallback.bind(this)
        this.appendScript(params)
      }
    }
    return index
  },
  getSrc (params) {
    const { apiKey } = params
    const src = `https://maps.googleapis.com/maps/api/js?callback=mapsCallback&key=${apiKey}&libraries=drawing`
    return src
  },
  appendScript (params) {
    const src = this.getSrc(params)
    const script = this.document.createElement('script')
    script.setAttribute('src', src)
    this.document.head.appendChild(script)
    this.appended = true
  },
  mapsCallback () {
    this.window.mapsCallback = undefined
    this.fireCallbacks()
  },
  fireCallbacks () {
    this.callbacks.forEach((callback) => callback())
    this.callbacks = []
  },
  removeCallback (index) {
    this.callbacks.splice(index - 1, 1)
  }
}
