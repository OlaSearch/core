function convertRange (value, [min, max], [rangeMin, rangeMax]) {
  return (value - min) * (rangeMax - rangeMin) / (max - min) + rangeMin
}

function scaleAndTransform (data, range) {
  var max = Math.max.apply(Math, data)
  var min = Math.min.apply(Math, data)
  return data.map((i) => {
    let d = i - (min < 0 ? min : 0)
    return convertRange(d, [min, max], range)
  })
}

export const SparkLine = function () {
  if (window.HTMLCanvasElement) {
    return {
      init (options) {
        let { el, data, endpoint, color = 'rgba(0,0,0,0.5)', style = 'line', update = false } = options
        var ctx = el.getContext('2d')
        var height = el.height - 3
        var width = el.width
        /* Transform data */
        data = scaleAndTransform(data, [0, height - 3])
        var total = data.length
        var max = Math.max.apply(Math, data)
        var min = Math.min.apply(Math, data)
        var xstep = width / total
        var ystep = (max - (min < 0 ? min : 0)) / height
        var x = 0
        var y = height - data[0] / ystep
        var i
        if (window.devicePixelRatio) {
          if (!update) {
            el.width = el.width * window.devicePixelRatio
            el.height = el.height * window.devicePixelRatio
            el.style.width = (el.width / window.devicePixelRatio) + 'px'
            el.style.height = (el.height / window.devicePixelRatio) + 'px'
            el.style.display = 'inline-block'
          }
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
        ctx.clearRect(0, 0, width, height + 3)
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.moveTo(x, y)
        for (i = 1; i < total; i = i + 1) {
          var d = data[i]
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
  }
}
