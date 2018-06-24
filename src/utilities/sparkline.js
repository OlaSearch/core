/**
 * Creates a sparkline on html canvas
 */
export function SparkLine () {
  if (window.HTMLCanvasElement) {
    return {
      /**
       * Initialize sparkline
       * @param  {Object} options
       */
      init (options) {
        const {
          el,
          endpoint,
          color = 'rgba(0,0,0,0.5)',
          fillColor = 'rgba(0, 129, 189, 0.25)',
          style = 'line',
          height: elHeight,
          width: elWidth
        } = options
        const ctx = el.getContext('2d')
        const height = elHeight - 3
        const width = elWidth
        /* Transform data */
        const data = scaleAndTransform(options.data, [0, height])
        const total = data.length
        const max = Math.max.apply(Math, data)
        const min = Math.min.apply(Math, data)
        const xstep = width / total
        const ystep = (max - (min < 0 ? min : 0)) / height
        var x = 0
        var y = height - data[0] / ystep
        var d
        if (window.devicePixelRatio) {
          el.width = elWidth * window.devicePixelRatio
          el.height = elHeight * window.devicePixelRatio
          el.style.width = elWidth + 'px'
          el.style.height = elHeight + 'px'
          el.style.display = 'inline-block'

          ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
        ctx.clearRect(0, 0, width, height + 3)
        ctx.beginPath()
        /* Reset */
        ctx.strokeStyle = color
        ctx.moveTo(x, y)

        for (let i = 1; i < total; i = i + 1) {
          d = data[i]
          x = x + xstep
          y = height - d / ystep + 2
          if (style === 'bar') {
            ctx.moveTo(x, height)
          }
          ctx.lineTo(x, y)
        }

        ctx.stroke()
        if (endpoint && style === 'line') {
          ctx.beginPath()
          ctx.fillStyle = 'rgba(255,0,0,0.5)'
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.fillStyle = fillColor
        ctx.moveTo(0, height + 3)
        ctx.lineTo(0, height - data[0] / ystep)
        x = 0
        for (let i = 1; i < total; i = i + 1) {
          d = data[i]
          x = x + xstep
          y = height - d / ystep + 2
          ctx.lineTo(x, y)
        }
        /* Last line */
        ctx.lineTo(x, height + 3)
        ctx.fill()
      }
    }
  }
}

/**
 * Normalizes number between a range
 */
function convertRange (value, [min, max], [rangeMin, rangeMax]) {
  return (value - min) * (rangeMax - rangeMin) / (max - min) + rangeMin
}

/**
 * Batch normalize
 */
function scaleAndTransform (data, range) {
  const max = Math.max.apply(Math, data)
  const min = Math.min.apply(Math, data)
  return data.map((i) => {
    const d = i - (min < 0 ? min : 0)
    return convertRange(d, [min, max], range)
  })
}
