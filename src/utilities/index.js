import React from 'react'
import flatten from 'ramda/src/flatten'

const utilities = {
  supplant (s, d) {
    for (var p in d) {
      s = s.replace(new RegExp('{' + p + '}', 'g'), d[p])
    }
    return s
  },
  arrayJoin (suffix, arr, separator = ', ') {
    if (!Array.isArray(arr)) return arr
    return (suffix || '') + arr.join(separator)
  },
  checkIfFacetExists (facets, name) {
    return facets.some((item) => item.name === name)
  },
  now () {
    return new Date().getTime()
  },
  debounce (func, wait, immediate) {
    var timeout, args, context, timestamp, result

    var later = function () {
      var last = utilities.now() - timestamp
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function () {
      context = this
      args = arguments
      timestamp = utilities.now()
      var callNow = immediate && !timeout
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  },
  parseRangeValues (value) {
    /* [1, 2, 3, 4] => [1, 2], [3, 4] */
    var valueArray = []
    var len = value.length

    for (var i = 0; i < len; i += 2) {
      valueArray.push([value[i], value[i + 1]])
    }

    return valueArray
  },
  castNumberToStringArray (values) {
    if (!Array.isArray(values)) throw new Error('Argument is Invalid')
    return values.map((item) => item.toString())
  },
  createHTMLMarkup (html) {
    if (Array.isArray(html)) html = html.join('')
    return { __html: html }
  },
  getDisplayName (haystack, needle) {
    if (!haystack) return needle
    if (needle in haystack) return haystack[needle]
    return needle
  },
  getMatchingSnippet (rules, result) {
    if (!rules) return false
    for (let i = 0, len = rules.length; i < len; i++) {
      let rule = rules[i].rules
      let matched = true
      if (Array.isArray(rule)) {
        for (let j = 0, len = rule.length; j < len; j++) {
          let { field, value } = rule[j]
          let fieldValue = result[field]
          if (!fieldValue || (fieldValue && !fieldValue.toString().match(new RegExp(value, 'gi')))) matched = false
        }
      } else {
        for (let field in rule) {
          let fieldValue = result[field]
          if (!fieldValue || (fieldValue && !fieldValue.toString().match(new RegExp(rule[field] + '$', 'gi')))) matched = false
        }
      }
      if (matched) return rules[i].template
    }
    return false
  },
  checkForAllowedCharacters (query, characters) {
    if (!query || !characters) return true
    let _regExp = new RegExp(characters, 'gi')
    return _regExp.test(query)
  },
  getComponentDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name
  },
  translateKey (path, obj, safe) {
    return obj[path] === null ? '' : obj[path] || path
  },
  sortHistory (a, b) {
    let a1 = a.popularity
    let b1 = b.popularity
    let a2 = a.dateAdded
    let b2 = b.dateAdded
    if (a1 === b1) {
      if (a2 < b2) return 1
      if (a2 > b2) return -1
    } else {
      if (a2 < b2) return 1
      if (a2 > b2) return -1
    }
    return 0
  },
  getFacetsToDisplay (selected, facets, facetsToDisplay) {
    var selections = flatten(selected.map((item) => item.selected))
    var names = []
    var defaultNames = facetsToDisplay['*']
    var hasKey = false

    /* Loop through selections and find Facets to display */
    for (let i = 0, len = selections.length; i < len; i++) {
      if (facetsToDisplay.hasOwnProperty(selections[i])) {
        names = [ ...names, ...facetsToDisplay[selections[i]] ]
        hasKey = true
      }
    }

    /* If there are no keys in `facetsToDisplay` Return all facets */
    if (!hasKey) names = defaultNames || []

    /**
     * Found
     * Ignore tabs
     */
    return facets.filter((facet) => !facet.tab && names.indexOf(facet.name) !== -1)
    .sort((a, b) => {
      let aIndex = names.indexOf(a.name)
      let bIndex = names.indexOf(b.name)
      if (aIndex > bIndex) return 1
      if (aIndex < bIndex) return -1
      return 0
    })
  },
  sanitizeAnchor (str) {
    if (!str) return null
    if (typeof str !== 'string') str = str.toString()
    return str.toLowerCase()
      .replace(/<(\/?)em>/gi, '') // remove solr's <em> tags..
      .replace(/<em.*?>/gi, '')
      .replace(/[^a-z0-9_\s-]/gi, '') // make alphanumeric (removes all other characters)
      .replace(/[\s-]+/gi, ' ') // clean up multiple dashes or whitespaces
      .replace(/[\s_]/gi, '-') // convert whitespaces and underscore to dash
  },
  sanitizePhone (str) {
    if (typeof str !== 'string') str = str.toString()
    return str.split('/')
      .shift()
      .replace(/[a-z_\s-()]/gi, '')
  },
  trim (str) {
    if (typeof str !== 'string') str = str.toString()
    return str.replace(/^\s+|\s+$/g, '')
  },
  triggerEvent (el, name, options) {
    var event
    if (window.CustomEvent) {
      event = new window.CustomEvent(name, options)
    } else {
      event = document.createEvent('CustomEvent')
      event.initCustomEvent(name, true, true, options)
    }
    el.dispatchEvent(event)
  },
  pickDeep (obj, key) {
    if (!obj) return null
    if (Object.keys(obj).indexOf(key) !== -1) return obj[key]
    for (let i in obj) {
      return utilities.pickDeep(obj[i], key)
    }
    return null
  },
  truncate (str, length, ellipsis = '...') {
    if (str.toString().length > length) {
      return str.substr(0, length).split(' ').slice(0, -1).join(' ') + ellipsis
    }
    return str
  },
  escapeRegEx (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
  },
  toNestedArray (data, rootLevel = 0, parentNode) {
    let output = []
    for (let i = 0, len = data.length; i < len; i++) {
      var count = data[i].count
      var items = data[i].name.split('/')
      var hasParent = items.length > rootLevel
      if (hasParent) {
        let parent = rootLevel
        ? items.length === rootLevel
          ? null
          : items.slice(0, items.length - 1).join('/') || null
        : items.slice(0, items.length - 1).join('/') || null
        output.push({
          displayName: items.pop(),
          count,
          parent,
          name: data[i].name
        })
      }
    }

    function getNestedChildren (arr, parent) {
      var out = []
      for (let i in arr) {
        if (arr[i].parent === parent) {
          var children = getNestedChildren(arr, arr[i].name)
          if (children.length) {
            arr[i].children = children
          }
          out.push(arr[i])
        }
      }
      return out
    }
    return getNestedChildren(output, parentNode === '' ? null : parentNode)
  },
  uuid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0
      var v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  getKey (key, namespace) {
    return namespace ? `${key}_${namespace}` : key
  },
  isSvg (path) {
    return path.split('.').pop().indexOf('svg') === 0
  },
  scrollTo (element) {
    /* To be implemented */
  },
  getCoords (element) {
    var box = element.getBoundingClientRect()
    var body = document.body
    var docEl = document.documentElement
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft
    var clientTop = docEl.clientTop || body.clientTop || 0
    var clientLeft = docEl.clientLeft || body.clientLeft || 0
    var top = box.top + scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft

    return {
      top: Math.round(top),
      left: Math.round(left)
    }
  },
  decimalAdjust (type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value)
    }
    value = +value
    exp = +exp
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN
    }
    // If the value is negative...
    if (value < 0) {
      return -utilities.decimalAdjust(type, -value, exp)
    }
    // Shift
    value = value.toString().split('e')
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
    // Shift back
    value = value.toString().split('e')
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
  },
  isValidUrl (str) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
    return regexp.test(str)
  },
  formatText (str, label) {
    if (utilities.isValidUrl(str)) {
      return <a className='ola-email-link' href={str}>{label}</a>
    }
    return str
  },
  sanitizeNumbers (text) {
    if (typeof text !== 'string') return text
    return parseFloat(text.replace(/<(?:.*|\n)*?>/gm, ''))
  }
}

module.exports = utilities
