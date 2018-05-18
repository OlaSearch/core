import React from 'react'
import flatten from 'ramda/src/flatten'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import {
  TYPE_TAXONOMY,
  TYPE_DOC,
  TYPE_FACET,
  LAYOUT_OPTIONS,
  SLOT_DATE,
  SLOT_NUMBER,
  TAXO_ENTITY,
  SEARCH_COLLECTION_IDENTIFIER
} from './../constants/Settings'
import xssFilters from 'xss-filters'
import scrollIntoView from 'dom-scroll-into-view'

/**
 * Returns string substituted with placeholders supplied
 * @param  {string} s String to substitute
 * @param  {object}
 * @return {string}
 *
 * Example: supplant('Hello {name}', { name: 'John Doe' })
 */
export function supplant (s, d) {
  for (var p in d) {
    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p] === null ? '' : d[p])
  }
  return s
}

/**
 * Joins an array with a custom separator
 * @param  {string} suffix
 * @param  {Object[]} arr
 * @param  {string} separator
 * @return {string}
 *
 * Example: arrayJoin('Names: ', ['John', 'Doe'], ',')
 */
export function arrayJoin (suffix, arr, separator = ', ') {
  if (!Array.isArray(arr)) return arr
  return (suffix || '') + arr.join(separator)
}

/**
 * Check if facet has already been selected
 * @param  {Object[]} facets
 * @param  {string} name
 * @return {Boolean}
 */
export function checkIfFacetExists (facets, name) {
  return facets.some((item) => item.name === name)
}

/**
 * @return {Number}
 */
export function now () {
  return new Date().getTime()
}

export function debounce (func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function () {
    var last = now() - timestamp
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
    timestamp = now()
    var callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function parseRangeValues (value) {
  /* [1, 2, 3, 4] => [1, 2], [3, 4] */
  var valueArray = []
  var len = value.length

  for (var i = 0; i < len; i += 2) {
    valueArray.push([value[i], value[i + 1]])
  }

  return valueArray
}

export function castNumberToStringArray (values) {
  if (!Array.isArray(values)) throw new Error('Argument is Invalid')
  return values.map((item) => item.toString())
}

export function createHTMLMarkup (html) {
  if (Array.isArray(html)) html = html.join('')
  return { __html: html }
}

export function decodeHtmlEntities (text) {
  return text.replace(/&#47;/gi, '/').replace(/&#124;/gi, '|')
}

export function cleanQueryTerm (term) {
  return decodeHtmlEntities(term)
}

export function getDisplayName (haystack, needle) {
  if (arguments && arguments.length === 1) {
    haystack = null
    needle = arguments[0]
  }
  if (!needle) return null
  if (Array.isArray(needle)) {
    return needle.map((n) => getDisplayName(haystack, n)).join(', ')
  }
  if (needle && typeof needle !== 'string') needle = needle.toString()
  if (needle.indexOf('|') !== -1) {
    needle = needle.substr(needle.indexOf('|') + 1)
  }
  if (!haystack) return needle
  if (needle in haystack) return decodeHtmlEntities(haystack[needle])
  return decodeHtmlEntities(needle)
}

export function getMatchingSnippet (rules, result) {
  if (!rules) return false
  for (let i = 0, len = rules.length; i < len; i++) {
    let rule = rules[i].rules
    let matched = true
    if (Array.isArray(rule)) {
      for (let j = 0, len = rule.length; j < len; j++) {
        let { field, value } = rule[j]
        let fieldValue = result[field]
        if (
          !fieldValue ||
          (fieldValue && !fieldValue.toString().match(new RegExp(value, 'gi')))
        ) {
          matched = false
        }
      }
    } else {
      for (let field in rule) {
        let fieldValue = result[field]
        if (
          !fieldValue ||
          (fieldValue &&
            !fieldValue.toString().match(new RegExp(rule[field] + '$', 'gi')))
        ) {
          matched = false
        }
      }
    }
    if (matched) return rules[i].template
  }
  return false
}

export function checkForAllowedCharacters (query, characters) {
  if (!query || !characters) return true
  let _regExp = new RegExp(characters, 'gi')
  return _regExp.test(query)
}

export function getComponentDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name
}

export function translateKey (path, obj, safe) {
  return obj[path] === null
    ? ''
    : obj[path] /* || (process.env.NODE_ENV === 'production' ? '' : path) */
}

export function isTaxonomyField (fieldName, fieldTypeMapping) {
  if (!(fieldName in fieldTypeMapping)) return false
  return fieldTypeMapping[fieldName] === TAXO_ENTITY
}

export function sortHistory (a, b) {
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
}

export function getFacetsToDisplay (selected, facets, facetsToDisplay) {
  var selections = flatten(selected.map((item) => item.selected))
  var names = []
  var defaultNames = facetsToDisplay['*']
  var hasKey = false

  /* Loop through selections and find Facets to display */
  for (let i = 0, len = selections.length; i < len; i++) {
    if (facetsToDisplay.hasOwnProperty(selections[i])) {
      names = [...names, ...facetsToDisplay[selections[i]]]
      hasKey = true
    }
  }

  /* If there are no keys in `facetsToDisplay` Return all facets */
  if (!hasKey) names = defaultNames || []

  /**
   * Found
   * Ignore tabs
   */
  return facets
    .filter((facet) => !facet.tab && names.indexOf(facet.name) !== -1)
    .sort((a, b) => {
      let aIndex = names.indexOf(a.name)
      let bIndex = names.indexOf(b.name)
      if (aIndex > bIndex) return 1
      if (aIndex < bIndex) return -1
      return 0
    })
}

export function sanitizeAnchor (str) {
  if (!str) return null
  if (typeof str !== 'string') str = str.toString()
  return str
    .toLowerCase()
    .replace(/<(\/?)em>/gi, '') // remove solr's <em> tags..
    .replace(/<em.*?>/gi, '')
    .replace(/[^a-z0-9_\s-]/gi, '') // make alphanumeric (removes all other characters)
    .replace(/[\s-]+/gi, ' ') // clean up multiple dashes or whitespaces
    .replace(/[\s_]/gi, '-') // convert whitespaces and underscore to dash
}

export function sanitizePhone (str) {
  if (typeof str !== 'string') str = str.toString()
  return str
    .split('/')
    .shift()
    .replace(/[a-z_\s-()]/gi, '')
}

export function trim (str) {
  if (typeof str !== 'string') str = str.toString()
  return str.replace(/^\s+|\s+$/g, '')
}

export function triggerEvent (el, name, options) {
  var event
  if (window.CustomEvent) {
    event = new window.CustomEvent(name, options)
  } else {
    event = document.createEvent('CustomEvent')
    event.initCustomEvent(name, true, true, options)
  }
  el.dispatchEvent(event)
}

export function pickDeep (obj, key) {
  if (!obj) return null
  if (Object.keys(obj).indexOf(key) !== -1) return obj[key]
  for (let i in obj) {
    return pickDeep(obj[i], key)
  }
  return null
}

export function truncate (str, length, ellipsis = '...') {
  if (str.toString().length > length) {
    return (
      str
        .substr(0, length)
        .split(' ')
        .slice(0, -1)
        .join(' ') + ellipsis
    )
  }
  return str
}

export function escapeRegEx (str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

/**
 * Removes special characters from text
 * @param  {string} str
 * @return {string}
 */
export function sanitizeText (str) {
  return xssFilters.inHTMLData(str)
}

/**
 * Used for heirarchical facets
 */
export function toNestedArray (
  data,
  rootLevel = 0,
  parentNode,
  delimiter = '/'
) {
  let output = []
  for (let i = 0, len = data.length; i < len; i++) {
    var count = data[i].count
    var items = data[i].name.split(delimiter)
    var hasParent = items.length > rootLevel
    if (hasParent) {
      let parent = rootLevel
        ? items.length === rootLevel
          ? null
          : items.slice(0, items.length - 1).join(delimiter) || null
        : items.slice(0, items.length - 1).join(delimiter) || null
      output.push({
        displayName: decodeHtmlEntities(items.pop()),
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
}

/**
 * Generates a unique UUID
 * @return {string}
 */
export function uuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getKey (key, namespace) {
  return namespace ? `${key}_${namespace}` : key
}

export function isSvg (path) {
  return (
    path
      .split('.')
      .pop()
      .indexOf('svg') === 0
  )
}

export function getCoords (element) {
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
    left: Math.round(left),
    width: box.width,
    height: box.height
  }
}

export function decimalAdjust (type, value, exp) {
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
    return -decimalAdjust(type, -value, exp)
  }
  // Shift
  value = value.toString().split('e')
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)))
  // Shift back
  value = value.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp))
}

/**
 * Check if a string is a URL
 * @param  {string} str
 * @return {Boolean}
 */
export function isValidUrl (str) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
  return regexp.test(str)
}

export function formatText (str, label) {
  if (isValidUrl(str)) {
    return (
      <a className='ola-email-link' href={str}>
        {label}
      </a>
    )
  }
  return str
}

export function sanitizeNumbers (text) {
  if (typeof text !== 'string') return text
  return parseFloat(text.replace(/<(?:.*|\n)*?>/gm, ''))
}

export function mergeResultsWithHistory (options) {
  let { history, results = [], query, limit = 5, showHistoryForQuery } = options
  /* Filter history when results are empty */
  const shouldShowHistoryForQuery =
    showHistoryForQuery || (!results.length && !query)

  /* Check if answer exists in the first result */
  if (results.length && results[0]['answer']) return results
  history = history
    .map(({ q, dateAdded, tokens }) => ({
      term: q.toLowerCase(),
      type: 'history',
      tokens,
      dateAdded
    }))
    .filter((his) => his.term && his.term !== '*')
    .sort((a, b) => {
      /* Sort by recency */
      if (a.dateAdded < b.dateAdded) return 1
      if (a.dateAdded > b.dateAdded) return -1
      return 0
    })
    .filter(
      (his, index, self) =>
        self.findIndex((t) =>
          t.term.match(
            new RegExp(
              '^' + his.term.replace(/(\(|\)|\[|\])/gi, '\\$1') + '$',
              'gi'
            )
          )
        ) === index
    )

  if (query) {
    /* Only history that starts with */
    if (shouldShowHistoryForQuery) {
      history = history
        .filter(({ term }) =>
          term.match(
            new RegExp('^' + query.replace(/(\(|\)|\[|\])/gi, '\\$1'), 'gi')
          )
        )
        .sort((a, b) => {
          /* Sort by match */
          if (a.term.indexOf(query) < b.term.indexOf(query)) return 1
          if (a.term.indexOf(query) > b.term.indexOf(query)) return -1
          return 0
        })
    } else {
      history = []
    }
  } else {
    /* If no query, should we show history */
    return history.filter((_, i) => i < limit)
  }

  /* Show history suggestions when query is not empty */
  if (query && shouldShowHistoryForQuery) {
    /* 3 */
    let historyTerms = history.map(({ term }) => term)

    /* Remove results that contains the history term */
    results = results.filter(
      ({ term, type }) =>
        !(type === 'query' && historyTerms.indexOf(term) !== -1)
    )
  }

  /* Only take top 3 history terms */
  history = history.filter((_, i) => i < limit)

  /* Merge history with results */
  return [...history, ...results]
}

export function getCaretPosition () {
  var x = 0
  var y = 0
  var sel = window.getSelection()
  if (sel.rangeCount) {
    var range = sel.getRangeAt(0).cloneRange()
    if (range.getClientRects()) {
      range.collapse(true)
      var rect = range.getClientRects()[0]
      if (rect) {
        y = rect.top
        x = rect.left
      }
    }
  }
  return {
    x,
    y
  }
}

export function redirect (url) {
  window.location.href = url
}

/**
 * Executes a function only once
 * @param  {Function}
 * @param  {Object}
 * @return {string|Object}
 */
export function once (fn, context) {
  var result
  return () => {
    if (fn) {
      result = fn.apply(context || this, arguments)
      fn = null
    }
    return result
  }
}

export function hexToRGBa (hex, opacity = 0.5) {
  hex = hex.replace('#', '')
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'
}

export function stringToColor (str) {
  return intToRGB(hashCode(str.toLowerCase()))
}

export function intToRGB (i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}

export function hashCode (str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

export function getWordPosition (textInput) {
  /* Break early */
  if (!textInput && textInput['selectionEnd']) return
  var carPos = textInput.selectionEnd
  const AUTOCOMPLETE_FAKE_ID = 'ola-autocomplete-fake-input'

  if (document.getElementById(AUTOCOMPLETE_FAKE_ID)) {
    var div = document.getElementById(AUTOCOMPLETE_FAKE_ID)
    var span = div.firstChild
  } else {
    var div = document.createElement('div')
    var span = document.createElement('span')
    var copyStyle = getComputedStyle(textInput)
    var coords = {}
    /* Copy styles */
    for (let i = 0; i < copyStyle.length; i++) {
      div.style[copyStyle[i]] = copyStyle[copyStyle[i]]
    }
    div.setAttribute('id', AUTOCOMPLETE_FAKE_ID)
    div.style.position = 'absolute'
    document.body.appendChild(div)
  }

  var letter
  var startToken = carPos
  do {
    letter = textInput.value.substring(carPos - 1, carPos)
    if (letter !== ' ') {
      carPos = carPos - 1
    }
  } while (letter && letter !== ' ' && carPos > 0)

  var currentWord = textInput.value
  var tmpCarPos = carPos
  var char
  do {
    tmpCarPos = tmpCarPos + 1
    char = currentWord.substring(tmpCarPos, tmpCarPos + 1)
  } while (char && char !== ' ')

  var activeWord = textInput.value.substring(carPos, tmpCarPos)

  div.textContent = textInput.value.substr(0, carPos)
  span.textContent = textInput.value.substr(carPos) || '.'
  div.appendChild(span)
  coords = {
    TOP: span.offsetTop,
    LEFT: span.offsetLeft
  }
  /* Remove the div */
  document.body.removeChild(div)

  return {
    leftPosition: textInput.offsetLeft - textInput.scrollLeft + coords.LEFT - 1,
    topPosition: textInput.offsetTop - textInput.scrollTop + coords.TOP + 14,
    word: activeWord,
    startToken: Math.max(0, carPos),
    endToken: tmpCarPos
  }
}

export function getAutoCompleteResults (
  results = [],
  allFacets,
  showWordSuggestion,
  tokens
) {
  /* Parse payload */
  let res = []
  let categoryFound = false
  let tokenNames = tokens.map(({ value }) => value)

  /* Check if word suggestion is turned on */
  if (showWordSuggestion) {
    results.facets.forEach(({ values, name }) => {
      for (let i = 0; i < values.length; i++) {
        let term = values[i].name
        if (tokenNames.indexOf(term) === -1) {
          res.push({
            term: cleanQueryTerm(term),
            suggestion_raw: term,
            type: TYPE_FACET,
            taxo_label: name
          })
        }
      }
    })
    return res
  }

  for (let i = 0, len = results.length; i < len; i++) {
    let { payload, term, ...rest } = results[i]
    /* Clean term */
    term = cleanQueryTerm(term)

    if (typeof payload === 'string') payload = JSON.parse(payload)
    let isCategory =
      payload.taxo_terms &&
      payload.taxo_terms.length > 0 &&
      !categoryFound &&
      payload.type !== TYPE_TAXONOMY
    let { topClicks } = payload
    /* Add top clicked document */
    let topClickDocs =
      i === 0 && topClicks && topClicks.length
        ? topClicks.filter((_, idx) => idx === 0).map((item) => ({
          term,
          title: item.title,
          type: TYPE_DOC,
          ...item
        }))
        : []

    /* If categories are found, we will need to create additional array items */
    if (isCategory) {
      let categories = payload.taxo_terms
      let totalCategories = categories.length
      /* Get the display names of the facets */
      let facet = find(propEq('name', payload.taxo_label))(allFacets)

      /* First term in the suggestion */
      res = [
        ...res,
        {
          ...rest,
          term,
          suggestion_raw: payload.suggestion_raw,
          label: payload.label,
          answer: payload.answer,
          type: payload.type /* The first item is a query */
        },
        ...topClickDocs
      ]

      for (let j = 0; j < totalCategories; j++) {
        let [name] = payload.taxo_terms[j].split('|')
        let [path] = payload.taxo_paths ? payload.taxo_paths[j].split('|') : []
        let displayName = facet ? facet.facetNames[name] || name : name
        res.push({
          ...rest,
          term,
          taxo_term: displayName,
          isLastCategory: j === totalCategories - 1,
          isFirstCategory: j === 0,
          ...payload,
          suggestion_raw: payload.suggestion_raw,
          taxo_path: path
        })
        categoryFound = true
      }
    } else {
      res = [...res, { ...rest, term, ...payload }, ...topClickDocs]
    }
  }
  return res
}

export function highlightTokens (text, tokens) {
  if (!tokens || !tokens.length) return text
  let arr = []
  let start = 0
  /**
   * Sort tokens by startToken
   */
  tokens = tokens.slice().sort((a, b) => a.startToken > b.startToken)
  for (let i = 0; i < tokens.length; i++) {
    let { startToken, endToken } = tokens[i]
    arr.push(text.substring(start, startToken))
    arr.push(
      `<span class="ola-input-tag">${text.substring(
        startToken,
        endToken
      )}</span>`
    )
    start = endToken
  }
  /* Push the last term */
  arr.push(text.substring(start, text.length))
  /* Return the final text */
  return arr.join('')
}

export function sortArrayByLength (a, b) {
  if (a.length > b.length) return -1
  if (a.length < b.length) return 1
  return 0
}

export function pick (keys, obj) {
  let res = {}
  var len = keys.length
  var idx = -1

  while (++idx < len) {
    var key = keys[idx]
    if (key in obj) {
      res[key] = obj[key]
    }
  }
  return res
}

export function getNextView (view) {
  const curIndex = LAYOUT_OPTIONS.indexOf(view) + 1
  return LAYOUT_OPTIONS[curIndex >= LAYOUT_OPTIONS.length ? 0 : curIndex]
}

export function syncTokens (old_text, new_text, tokens) {
  // http://jsbin.com/futowerilu/1/edit?js,console
  if (old_text === new_text) return tokens
  let inc = 1
  if (old_text.length > new_text.length) {
    inc = -1
  }
  return tokens.map(({ startToken, endToken, value, ...rest }) => {
    let len = endToken - startToken
    value = value.toLowerCase()
    let text = new_text.substring(startToken, endToken)
    let i = 0
    while (text !== value && i < 10) {
      startToken = startToken + inc
      endToken = len + startToken
      text = new_text.substring(startToken, endToken)
      i++
    }
    return {
      ...rest,
      startToken,
      endToken,
      value
    }
  })
}

/**
 * Scroll to element
 */
export function scrollTo (el) {
  scrollIntoView(el, document, {
    onlyScrollIfNeeded: true
  })
}

/**
 * Smooth scroll
 */
export function smoothScroll (
  element,
  target,
  duration = 300,
  direction = 'horizontal'
) {
  target = Math.round(target)
  duration = Math.round(duration)
  const scrollDir = direction === 'vertical' ? 'scrollTop' : 'scrollLeft'
  if (duration < 0) {
    return Promise.reject('bad duration')
  }
  if (duration === 0) {
    element[scrollDir] = target
    return Promise.resolve()
  }

  var start_time = Date.now()
  var end_time = start_time + duration
  var start_top = element[scrollDir]
  var distance = target - start_top

  // based on http://en.wikipedia.org/wiki/Smoothstep
  var smooth_step = function (start, end, point) {
    if (point <= start) return 0
    if (point >= end) return 1
    var x = (point - start) / (end - start) // interpolation
    return x * x * (3 - 2 * x)
  }

  return new Promise(function (resolve, reject) {
    // This is to keep track of where the element's scrollTop is
    // supposed to be, based on what we're doing
    var previous_top = element[scrollDir]

    // This is like a think function from a game loop
    var scroll_frame = function () {
      if (element[scrollDir] != previous_top) return

      // set the scrollTop for this frame
      var now = Date.now()
      var point = smooth_step(start_time, end_time, now)
      var frameTop = Math.round(start_top + distance * point)
      element[scrollDir] = frameTop

      // check if we're done!
      if (now >= end_time) return resolve()

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (
        element[scrollDir] === previous_top &&
        element[scrollDir] !== frameTop
      ) {
        return resolve()
      }
      previous_top = element[scrollDir]

      // schedule next frame for execution
      window.requestAnimationFrame(scroll_frame)
    }

    // boostrap the animation process
    window.requestAnimationFrame(scroll_frame)
  })
}

/**
 * Get field label
 * post_title => 'Title'
 * post_title_s => 'Title'
 */

export function getFieldLabel (field, fieldLabels) {
  /* Remove field type */
  field = field.replace(
    /_(ss|s|tdt|t|ts|b|bs|d|ds|f|fs|i|is|p|l|ls|dr|taxo_entity)$/gi,
    ''
  )
  if (field in fieldLabels) return fieldLabels[field]
  return null
}

/**
 * Get facet type
 */

export function getFacetTypeFromSlot (type, value) {
  switch (type) {
    case SLOT_DATE:
      return Array.isArray(value) && Array.isArray(value[0])
        ? 'daterange'
        : 'string'

    case SLOT_NUMBER:
      return Array.isArray(value) && Array.isArray(value[0])
        ? 'range'
        : 'string'

    default:
      return 'string'
  }
}

/**
 * Check if current element is focusable
 */
export function isFocusable (el) {
  if (!el) return false
  if (['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].indexOf(el.nodeName) !== -1) {
    return true
  }
  if (el.getAttribute('href')) return true
  const tabIndex = el.getAttribute('tabindex')
  if (tabIndex && tabIndex !== '-1') return true
  return false
}

/**
 * Remove pipes from fieldvalue for ola_collection_name and Taxo_entity
 */

// export function (fieldValue, fieldName, fieldTypeMapping) {
//   if (fieldName === SEARCH_COLLECTION_IDENTIFIER ||
//     (
//       fieldTypeMapping &&
//       fieldName in fieldTypeMapping &&
//       fieldTypeMapping[fieldName] === TAXO_ENTITY
//     )
//   ) {
//     return getDisplayName(fieldValue)
//   }
//   return fieldValue
// }

export function getDocument () {
  if (typeof document !== undefined) return document
  return null
}

/**
 * Is local host
 */
export function isDev () {
  const doc = getDocument()
  if (!doc) return false
  const { hostname } = document.location
  return (
    hostname === '' ||
    ['localhost', '127.0.0.1'].indexOf(hostname) !== -1 ||
    hostname.match(/^\d/gi)
  )
}

/**
 * Type of link
 * ola-external
 * ola-doc
 * ola-file
 */
export function getLinkType (url) {
  console.log(url)
}
