import fecha from 'fecha'

const DateParser = {
  format (date, mask) {
    if (!date) return
    if (typeof date === 'string' || typeof date === 'number') date = fecha.parse(date)
    return fecha.format(date, mask)
  }
}

module.exports = DateParser
