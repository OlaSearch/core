import expect from 'expect'
import { log } from './../../src/actions/Logger'

describe('Logger', () => {
  it('is a function', () => {
    expect(log).toExist()
  })

  it('throws error when eventype does not exist', () => {
    expect(() => log()).toThrow(/Invalid/)
    expect(() => log({})).toThrow(/Invalid/)
  })

  it('returns a dispatch function', () => {
    expect(() => log({ eventType: 'Q'})).toExist()
  })
})