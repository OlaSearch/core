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
      /**
       * Check if the value is a valid date
       * Example: 2015-12-02
       */
      let d = new Date(date)
      if (Object.prototype.toString.call(d) === '[object Date]' &&
        !isNaN(d.getTime())) {
        // Valid date
        return fecha.format(d, mask)
      }
      date = DateParser.parse(date, originalFormat || defaultMask)
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
