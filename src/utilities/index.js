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
    return arr ? suffix + arr.join(separator) : null
  },
  checkIfFacetExists (facets, name) {
    for (var i = 0; i < facets.length; i++) {
      if (facets[i].name === name) {
        return i
      }
    }

    return null
  },
  getValuesFromSelect (select) {
    var result = []
    var options = select && select.options
    var opt

    for (var i = 0, len = options.length; i < len; i++) {
      opt = options[i]

      if (opt.selected) {
        result.push(opt.value || opt.text)
      }
    }

    return result
  },
  now: Date.now || function () {
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
      valueArray.push([ value[i], value[i + 1] ])
    }

    return valueArray
  },
  castNumberToStringArray (numberArray) {
    return numberArray.map((item) => item.toString())
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
  generateSlug (value) {
    return value.toString().toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  },
  checkForAllowedCharacters (query, characters) {
    if (!query || !characters) return true
    let _regExp = new RegExp(characters, 'gi')
    return _regExp.test(query)
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

    if (!hasKey) names = defaultNames

    /* Found */

    return facets.filter((facet) => !facet.tab && names.indexOf(facet.name) !== -1)
  }
}

module.exports = utilities
