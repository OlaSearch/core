import fecha from 'fecha'

const defaultMask = 'YYYY-MM-DD'
const DateParser = {
  format (date, mask = defaultMask, originalFormat) {
    if (!date) return
    if (typeof date === 'string' || typeof date === 'number') {
      date = fecha.parse(date, originalFormat || defaultMask)
    }
    return fecha.format(date, mask)
  }
}

module.exports = DateParser
