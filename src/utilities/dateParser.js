import fecha from 'fecha'

const defaultMask = 'YYYY-MM-DD'
const DateParser = {
  format (date, mask = defaultMask, originalFormat) {
    if (!date) return
    if (typeof date === 'number' || !isNaN(date)) {
      date = new Date(date)
      return fecha.format(date, mask)
    }
    try {
      date = fecha.parse(date, originalFormat || defaultMask)
    } catch (e) {
      console.warn(e, date)
      return ''
    }
    return fecha.format(date, mask)
  },
  parse (date, mask = defaultMask) {
    try {
      date = fecha.parse(date, mask)
    } catch (e) {
      console.warn(e, date)
      return ''
    }
    return date
  },
  today (mask = defaultMask) {
    return this.format(new Date(), mask)
  }
}

module.exports = DateParser
