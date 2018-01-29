import fecha from 'fecha'

const defaultMask = 'YYYY-MM-DD'

export function format (date, mask = defaultMask, originalFormat) {
  if (!date) return
  if (typeof date === 'number' || !isNaN(date)) {
    date = new Date(date)
    return fecha.format(date, mask)
  }
  try {
    /**
     * Check if the value is a valid date
     * Example: 2015-12-02
     */
    if (mask === defaultMask) {
      let d = new Date(date)
      if (
        Object.prototype.toString.call(d) === '[object Date]' &&
        !isNaN(d.getTime())
      ) {
        // Valid date
        return fecha.format(d, mask)
      }
    }
    date = parse(date, originalFormat || defaultMask)
  } catch (e) {
    console.warn(e, date)
    return ''
  }
  return fecha.format(date, mask)
}
export function parse (date, mask = defaultMask) {
  try {
    /**
     * Check if the value is a valid date
     * Example: 2015-12-02
     */
    if (mask === defaultMask) {
      let d = new Date(date)
      if (
        Object.prototype.toString.call(d) === '[object Date]' &&
        !isNaN(d.getTime())
      ) {
        // Valid date
        return d
      }
    }
    date = fecha.parse(date, mask)
  } catch (e) {
    console.warn(e, date)
    return ''
  }
  return date
}

export function formatUTC (date, mask = defaultMask) {
  const d = new Date(date)
  const userTimezoneOffset = d.getTimezoneOffset() * 60000
  const _d = new Date(d.getTime() + userTimezoneOffset)
  return this.format(_d, mask)
}

export function toUTC (date, mask = defaultMask) {
  return parse(date, mask).toISOString()
}

export function today (mask = defaultMask) {
  return this.format(new Date(), mask)
}

export default {
  format,
  parse,
  formatUTC,
  toUTC,
  today
}
