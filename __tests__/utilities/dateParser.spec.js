import expect from 'expect'
import { format } from './../../src/utilities/dateParser'

describe('dateParser', () => {
  it('returns nothing without any input', () => {
    expect(format()).toEqual()
  })

  it('parses date when string', () => {
    expect(format('2015-02-21')).toEqual('2015-02-21')
  })

  it('formats date', () => {
    let date = new Date(2015, 1, 21)
    expect(format(date, 'YYYY-MM-DD')).toEqual('2015-02-21')
  })

  it('warns when date cannot be parsed', () => {
    expect(() => format('asdas')).toThrow(/Invalid/)
  })
})