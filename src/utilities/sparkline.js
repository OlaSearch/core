export const SparkLine = function (c, data, endpoint, color = 'rgba(0,0,0,0.5)', style = 'line') {
  if (window.HTMLCanvasElement) {
    var ctx = c.getContext('2d')
    var height = c.height - 3
    var width = c.width
    var total = data.length
    var max = Math.max.apply(Math, data)
    var min = Math.min.apply(Math, data)
    var xstep = width / total
    var ystep = (max - (min < 0 ? min : 0)) / height
    var x = 0
    var y = height - data[0] / ystep
    var i
    if (window.devicePixelRatio) {
      c.width = c.width * window.devicePixelRatio
      c.height = c.height * window.devicePixelRatio
      c.style.width = (c.width / window.devicePixelRatio) + 'px'
      c.style.height = (c.height / window.devicePixelRatio) + 'px'
      c.style.display = 'inline-block'
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(x, y)
    for (i = 1; i < total; i = i + 1) {
      var d = data[i] - (min < 0 ? min : 0)
      x = x + xstep
      y = height - d / ystep + 2
      if (style === 'bar') { ctx.moveTo(x, height) }
      ctx.lineTo(x, y)
    }
    ctx.stroke()
    if (endpoint && style === 'line') {
      ctx.beginPath()
      ctx.fillStyle = 'rgba(255,0,0,0.5)'
      ctx.arc(x, y, 1.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}
