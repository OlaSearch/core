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
    for (let i = 0; i < facets.length; i++) {
      if (facets[i].name === name) {
        return i
      }
    }
    return null
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
    return { __html: html }
  },
  getDisplayName (haystack, needle) {
    if (!haystack) return needle
    if (haystack[needle]) return haystack[needle]
    return needle
  },
  getMatchingSnippet (rules, result) {
    if (!rules) return false
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i].rules
      let matched = true
      if (Array.isArray(rule)) {
        for (let j = 0; j < rule.length; j++) {
          let { field, value } = rule[j]
          let fieldValue = result[field]
          if (!fieldValue || fieldValue && !fieldValue.toString().match(new RegExp(value, 'gi'))) matched = false
        }
      } else {
        for (let field in rule) {
          let fieldValue = result[field]
          if (!fieldValue || fieldValue && !fieldValue.toString().match(new RegExp(rule[field], 'gi'))) matched = false
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
    return obj[path] || path
    // To enable `dot` based translation, uncomment this
    // 'search.placeholder.inner'
    // return path.split('.').reduce((prev, curr) => {
    //   return !safe ? prev[curr] : (prev ? prev[curr] : undefined)
    // }, obj)
  },
  getFacetsToDisplay (selected, facets, facetsToDisplay) {
    var selections = flatten(selected.map((item) => item.selected))
    var names = []
    var defaultNames = facetsToDisplay['*']
    var hasKey = false

    /* Loop through selections and find Facets to display */

    selections.forEach((item) => {
      if (facetsToDisplay.hasOwnProperty(item)) {
        names = facetsToDisplay[item]
        hasKey = true
      }
    })

    /* If there are no keys in `facetsToDisplay` Return all facets */
    if (!hasKey) names = defaultNames || []

    /**
     * Found
     * Ignore tabs
     */
    return facets.filter((facet) => !facet.tab && names.indexOf(facet.name) !== -1)
  },
  sanitizeAnchor (text) {
    if (!text) return null
    let str = text.toString().toLowerCase()
    // remove solr's <em> tags..
    str = str.replace(/<(\/?)em>/gi, '')
    str = str.replace(/<em.*?>/gi, '')
    // make alphanumeric (removes all other characters)
    str = str.replace(/[^a-z0-9_\s-]/gi, '')
    // clean up multiple dashes or whitespaces
    str = str.replace(/[\s-]+/gi, ' ')
    // convert whitespaces and underscore to dash
    str = str.replace(/[\s_]/gi, '-')
    // return '#' + str;
    return str
  },
  trim (str) {
    return str.replace(/^\s+|\s+$/g, '')
  }
}

module.exports = utilities
