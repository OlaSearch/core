import fecha from 'fecha'

const defaultMask = 'YYYY-MM-DD'

/**
 * Formats a date object to a formatted string
 * @param  {(string|Object)} date
 * @param  {string} mask Default date format
 * @param  {string} originalFormat If a date is passed in as string, provide this format
 * @return {string}
 */
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
      const d = new Date(date)
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

/**
 * Accepts a Date string and a string format and returns a Date object.
 * @param  {string} date
 * @param  {type} mask
 * @return {Object}
 */
export function parse (date, mask = defaultMask) {
  try {
    /**
     * Check if the value is a valid date
     * Example: 2015-12-02
     */
    if (mask === defaultMask) {
      const d = new Date(date)
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

/**
 * Check if two dates are in the same day and same time
 * @param  {string}  start
 * @param  {string}  end
 * @return {Boolean}
 */
export function isSameDay (start, end) {
  return parse(start).toDateString() === parse(end).toDateString()
}

/**
 * Formats a UTC date
 * @param  {(string|Object)} date
 * @param  {string} mask
 * @param  {string} type One of `from` or `to`
 * @return {string}
 */
export function formatUTC (date, mask = defaultMask, type = null) {
  if (date === 'NOW') return 'Today'
  if (date === '*') return type && type === 'from' ? 'Past' : 'Future'
  const d = new Date(date)
  // const userTimezoneOffset = d.getTimezoneOffset() * 60000
  // const _d = new Date(d.getTime() + userTimezoneOffset)
  return format(d, mask)
}

/**
 * Convert a date to UTC
 * @param  {(string|Object)} date
 * @param  {string} mask
 * @return {string}
 */
export function toUTC (date, mask) {
  return parse(date, mask).toISOString()
}

/**
 * Get today's date
 * @param  {string} mask
 * @return {Object}
 */
export function today (mask = defaultMask) {
  return format(new Date(), mask)
}

export default {
  format,
  parse,
  formatUTC,
  toUTC,
  today,
  isSameDay
}
