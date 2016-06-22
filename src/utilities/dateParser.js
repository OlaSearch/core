import fecha from 'fecha'

const DateParser = {
  format (date, mask, originalFormat) {
    if (!date) return
    if (typeof date === 'string' || typeof date === 'number') {
      date = fecha.parse(date, originalFormat || 'YYYY-MM-DD')
    }
    return fecha.format(date, mask)
  }
}

module.exports = DateParser
