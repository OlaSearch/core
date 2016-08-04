import expect from 'expect'
import utils from './../../src/utilities'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { mount, shallow } from 'enzyme'

const FACETS_STUB = [{
  name: 'genres_sm'
}]
const DISPLAY_NAME_ARRAY = {
  'hello': 'Hello display name'
}

const SNIPPET_RULES = [
  {
    rules: {
      snippet_type: "transaction-code"
    },
    template: 'CodeSnippet'
  },
  {
    rules: {
      snippet_type: "branch"
    },
    template: 'BranchSnippet'
  },
  {
    rules: {
      snippet_type: "personal_cc"
    },
    template: 'CardSnippet'
  }
]

const SNIPPET_RULES_ARRAY = [
  {
    rules: [
      {
        field: 'snippet_type',
        value: 'transaction-code'
      },
      {
        field: 'section',
        value: 'bank'
      }
    ],
    template: 'BankSnippet'
  },
  {
    rules: [{
      field: 'snippet_type',
      value: 'transaction-code'
    }],
    template: 'CodeSnippet'
  }
]

const FACETS_TO_DISPLAY = {
  'credit-card': ['facet_1', 'genres_sm'],
}

describe('Utilities', () => {
  describe('supplant', () => {
    it('replaces {} with placeholder', () => {
      expect(utils.supplant('hey {name}', {name: 'Foo'})).toEqual('hey Foo')
    })

    it('return original string when no arguments', () => {
      expect(utils.supplant('hey {name}')).toEqual('hey {name}')
    })
  })

  describe('arrayJoin', () => {
    it('joins array', () => {
      let arr = ['a', 'b']
      expect(utils.arrayJoin(null, arr)).toEqual('a, b')
    })

    it('joins array with suffix', () => {
      let arr = ['a', 'b']
      expect(utils.arrayJoin('hello', arr)).toEqual('helloa, b')
    })

    it('returns original value if not an array', () => {
      let arr = 'a,b'
      expect(utils.arrayJoin(null, arr)).toEqual('a,b')
    })

    it('returns null', () => {
      let arr = 'a,b'
      expect(utils.arrayJoin(null, null)).toEqual(null)
    })
  })

  describe('checkIfFacetExists', () => {
    it('finds a match in facet array', () => {
      expect(utils.checkIfFacetExists(FACETS_STUB, 'genres_sm')).toEqual(0)
    })

    it('returns null when no match is found', () => {
      expect(utils.checkIfFacetExists(FACETS_STUB, 'genres_sms')).toEqual(null)
    })
  })

  describe('now', () => {
    it('returns current time', () => {
      expect(utils.now()).toEqual(new Date().getTime())
    })
  })

  describe('debounce', () => {
    it('exists', () => {
      expect(utils.debounce).toExist()
    })

    it('will be called', (done) => {
      let a = null
      const deboucedFn = utils.debounce(() => { a = true}, 500)
      deboucedFn()
      setTimeout(() => {
        expect(a).toBe(true)
        done()
      }, 510)
    })

    it('immediate debounce will be called', (done) => {
      let a = null
      const deboucedFn = utils.debounce(() => { a = true }, 500, true)
      deboucedFn()
      deboucedFn()
      deboucedFn()
      setTimeout(() => {
        expect(a).toBe(true)
        done()
      }, 0)
    })

    it('multiple calls will only be called once', (done) => {
      let a = null
      const deboucedFn = utils.debounce(() => { a = true }, 500)
      deboucedFn()
      deboucedFn()
      deboucedFn()
      deboucedFn()
      deboucedFn()
      setTimeout(() => {
        expect(a).toBe(true)
        done()
      }, 510) /* added some delay */
    })
  })

  describe('parseRangeValues', () => {
    it('converts range values to 2 by 2 arrays', () => {
      let arr = [1, 2, 3, 4]
      expect(utils.parseRangeValues(arr).length).toEqual(2)
      expect(utils.parseRangeValues(arr)).toEqual([[1,2], [3,4]])
    })
  })

  describe('castNumberToStringArray', () => {
    it('converts an array of numbers to string', () => {
      expect(utils.castNumberToStringArray([1,2])).toEqual(['1', '2'])
      expect(utils.castNumberToStringArray([])).toEqual([])
      expect(() => utils.castNumberToStringArray(null)).toThrow(/Invalid/)
    })
  })

  describe('createHTMLMarkup', () => {
    it('creates html markup for react', () => {
      expect(utils.createHTMLMarkup('hello <strong>Foo</strong>')).toEqual({
        __html: 'hello <strong>Foo</strong>'
      })
    })
  })

  describe('getDisplayName', () => {
    it('returns needle when no haystack', () => {
      expect(utils.getDisplayName(null, 'hello')).toEqual('hello')
    })

    it('returns display name', () => {
      expect(utils.getDisplayName(DISPLAY_NAME_ARRAY, 'hello')).toEqual('Hello display name')
      expect(utils.getDisplayName(DISPLAY_NAME_ARRAY, 'hello_invalid')).toEqual('hello_invalid')
    })
  })

  describe('getMatchingSnippet', () => {
    it('return true if no arguments are supplied', () => {
      expect(utils.getMatchingSnippet()).toBe(false)
    })
    it('finds matching snippet', () => {
      expect(utils.getMatchingSnippet(SNIPPET_RULES, { snippet_type: 'transaction-code'})).toEqual('CodeSnippet')
      expect(utils.getMatchingSnippet(SNIPPET_RULES, { snippet_type: 'branch'})).toEqual('BranchSnippet')
      expect(utils.getMatchingSnippet(SNIPPET_RULES, { snippet_type: 'personal_cc'})).toEqual('CardSnippet')
    })

    it('finds matching snippet in array', () => {
      expect(utils.getMatchingSnippet(SNIPPET_RULES_ARRAY, { snippet_type: 'transaction-code', section: 'bank'})).toEqual('BankSnippet')
      expect(utils.getMatchingSnippet(SNIPPET_RULES_ARRAY, { snippet_type: 'transaction-code'})).toEqual('CodeSnippet')
      expect(utils.getMatchingSnippet(SNIPPET_RULES_ARRAY, { snippet_type: 'donot_exist'})).toEqual(false)
    })
  })

  describe('checkForAllowedCharacters', () => {
    var characters = '^[a-zA-Z0-9$£€¥@%# ]+$'
    it('returns true if no arguments are supplied', () => {
      expect(utils.checkForAllowedCharacters()).toBe(true)
    })
    it('finds characters in string', () => {
      expect(utils.checkForAllowedCharacters('a', characters)).toEqual(true)
    })

    it('disallows banned characters in the query', () => {
      expect(utils.checkForAllowedCharacters('()', characters)).toEqual(false)
      expect(utils.checkForAllowedCharacters('<>', characters)).toEqual(false)
      expect(utils.checkForAllowedCharacters('asdasdas/', characters)).toEqual(false)
    })
  })

  describe('getComponentDisplayName', () => {
    it('returns displayName of component', () => {
      const Test = (props) => <span>Hey there</span>
      expect(utils.getComponentDisplayName(Test)).toBe('Test')
    })
  })

  describe('translateKey', () => {
    it('gets matching translation', () => {
      expect(utils.translateKey('hello', {hello: 'Ni Hao Ma'})).toBe('Ni Hao Ma')
    })

    it('returns key if translation not found', () => {
      expect(utils.translateKey('hello there', {hello: 'Ni Hao Ma'})).toBe('hello there')
    })
  })

  describe('getFacetsToDisplay', () => {
    it('displays the right facets', () => {
      var selected = [{ selected: 'facet_1' }]
      expect(utils.getFacetsToDisplay(selected, FACETS_STUB, FACETS_TO_DISPLAY)).toEqual([])
      var selected = [{ selected: 'credit-card' }]
      expect(utils.getFacetsToDisplay(selected, FACETS_STUB, FACETS_TO_DISPLAY)).toEqual(FACETS_STUB)
    })
  })

  describe('sanitizeAnchor', () => {
    it('converts text to string for number', () => {
      expect(utils.sanitizeAnchor(100)).toBe('100')
    })
    it('returns empty string for no arguments', () => {
      expect(utils.sanitizeAnchor()).toBe(null)
    })
    it('converts text to lowercase', () => {
      expect(utils.sanitizeAnchor('HELLO')).toBe('hello')
    })
    it('removes em tags', () => {
      expect(utils.sanitizeAnchor('HELLO <em>tag</em>')).toBe('hello-tag')
    })
    it('converts spaces to dash', () => {
      expect(utils.sanitizeAnchor('HELLO 12')).toBe('hello-12')
    })
    it('removes multiple dashes', () => {
      expect(utils.sanitizeAnchor('HELLO  12')).toBe('hello-12')
    })
    it('converts underscore to dashe', () => {
      expect(utils.sanitizeAnchor('HELLO_12')).toBe('hello-12')
    })
    it('converts numbers to string before sanitizing', () => {
      expect(utils.sanitizeAnchor(1234)).toEqual(1234)
    })
  })

  describe('trim', () => {
    it('removes whitespaces', () => {
      expect(utils.trim(' hey ')).toEqual('hey')
    })

    it('handles numbers', () => {
      expect(utils.trim(123)).toEqual(123)
    })
  })

  describe('sanitizePhone', () => {
    it('removes spaces', () => {
      expect(utils.sanitizePhone('+65 1234')).toEqual('+651234')
    })

    it('removes special characters', () => {
      expect(utils.sanitizePhone('+65 (1234)')).toEqual('+651234')
      expect(utils.sanitizePhone('+65asa(1234)')).toEqual('+651234')
    })

    it('takes first element', () => {
      expect(utils.sanitizePhone('+65 (1234)/ + 65 1234')).toEqual('+651234')
    })

    it('parses arrays of numbers', () => {
      expect(utils.sanitizePhone('+65 (1234)/ + 65 1234 / 12312312/12312')).toEqual('+651234')
    })

    it('can parse numbers and strings', () => {
      expect(utils.sanitizePhone(90291442)).toEqual(90291442)
      expect(utils.sanitizePhone(1234)).toEqual(1234)
      expect(utils.sanitizePhone('abc')).toEqual('')
    })
  })
})