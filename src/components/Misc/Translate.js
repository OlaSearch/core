import React from 'react'
import injectTranslate from './../../decorators/OlaTranslate'

function Translate ({ id, translate, tagName }) {
  return React.createElement(tagName, null, translate(id))
}

Translate.defaultProps = {
  tagName: 'span'
}

module.exports = injectTranslate(Translate)
